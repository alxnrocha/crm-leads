import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Sequelize, QueryTypes } from 'sequelize';
import mysql from 'mysql2';
import dotenv from 'dotenv';
import { config } from '../config/env.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DEFAULT_MIGRATIONS_DIR = path.join(__dirname, '..', '..', 'migrations');
const MIGRATIONS_TABLE = 'schema_migrations';

async function ensureDatabase(): Promise<void> {
  const connection = mysql.createConnection({
    host: config.db.host,
    port: config.db.port,
    user: config.db.user,
    password: config.db.password,
  });

  await new Promise<void>((resolve, reject) => {
    connection.query(
      `CREATE DATABASE IF NOT EXISTS \`${config.db.database}\`
       CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`,
      (err) => (err ? reject(err) : resolve())
    );
  });

  connection.end();
}

function listMigrationFiles(dir: string): {
  seq: string;
  name: string;
  up: string | null;
  down: string | null;
}[] {
  if (!fs.existsSync(dir)) {
    throw new Error(`Directorio de migraciones no encontrado: ${dir}`);
  }
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.sql'));
  const grouped = new Map<string, { up: string | null; down: string | null }>();

  for (const file of files) {
    const match = file.match(/^(\d{4})_([^.]+)\.(up|down)\.sql$/);
    if (!match) continue;
    const [, seq, , direction] = match;
    const fullPath = path.join(dir, file);
    if (!grouped.has(seq)) grouped.set(seq, { up: null, down: null });
    const entry = grouped.get(seq)!;
    if (direction === 'up') entry.up = fullPath;
    else entry.down = fullPath;
  }

  return [...grouped.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([seq, paths]) => ({
      seq,
      name:
        fs
          .readdirSync(dir)
          .find((f) => f.startsWith(`${seq}_`))
          ?.replace(`.sql`, '') ?? seq,
      up: paths.up,
      down: paths.down,
    }));
}

export async function runMigrations(directory = DEFAULT_MIGRATIONS_DIR): Promise<string[]> {
  await ensureDatabase();

  const sequelize = new Sequelize(config.db.database, config.db.user, config.db.password, {
    host: config.db.host,
    port: config.db.port,
    dialect: 'mysql',
    logging: false,
  });

  const applied: string[] = [];

  try {
    await sequelize.authenticate();

    await sequelize.query(`
      CREATE TABLE IF NOT EXISTS \`${MIGRATIONS_TABLE}\` (
        \`name\` VARCHAR(255) NOT NULL PRIMARY KEY,
        \`run_at\` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    const [rows] = await sequelize.query(`SELECT \`name\` FROM \`${MIGRATIONS_TABLE}\``, {
      type: QueryTypes.SELECT,
    });
    const appliedSet = new Set((rows as { name: string }[]).map((r) => r.name));

    const migrations = listMigrationFiles(directory);

    for (const migration of migrations) {
      if (appliedSet.has(migration.name)) continue;
      if (!migration.up) continue;

      const sql = fs.readFileSync(migration.up, 'utf8');
      await sequelize.query(sql, { logging: false });
      await sequelize.query(`INSERT INTO \`${MIGRATIONS_TABLE}\` (\`name\`) VALUES (?)`, {
        replacements: [migration.name],
        logging: false,
      });
      console.log(`✅ [migrate] ${migration.name}`);
      applied.push(migration.name);
    }

    console.log(
      applied.length > 0
        ? `🎉 Migraciones aplicadas (${applied.length}).`
        : '👍 Base de datos ya está al día, no hay migraciones pendientes.'
    );
  } finally {
    await sequelize.close();
  }

  return applied;
}

export async function rollbackLast(directory = DEFAULT_MIGRATIONS_DIR): Promise<void> {
  await ensureDatabase();

  const sequelize = new Sequelize(config.db.database, config.db.user, config.db.password, {
    host: config.db.host,
    port: config.db.port,
    dialect: 'mysql',
    logging: false,
  });

  try {
    const [rows] = await sequelize.query(
      `SELECT \`name\` FROM \`${MIGRATIONS_TABLE}\` ORDER BY \`name\` DESC LIMIT 1`,
      { type: QueryTypes.SELECT }
    );

    const last = (rows as { name?: string }[])[0]?.name;
    if (!last) {
      console.log('No hay migraciones aplicadas que revertir.');
      return;
    }

    const migrations = listMigrationFiles(directory);
    const match = migrations.find((m) => m.name === last);
    if (match && match.down) {
      const sql = fs.readFileSync(match.down, 'utf8');
      await sequelize.query(sql, { logging: false });
    }
    await sequelize.query(`DELETE FROM \`${MIGRATIONS_TABLE}\` WHERE \`name\` = ?`, {
      replacements: [last],
      logging: false,
    });
    console.log(`↩️  [rollback] ${last}`);
  } finally {
    await sequelize.close();
  }
}

async function main() {
  const action = process.argv[2] || 'up';
  if (action === 'down') {
    await rollbackLast();
  } else {
    await runMigrations();
  }
  process.exit(0);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main().catch((err) => {
    console.error('❌ Falla en la migración:', err instanceof Error ? err.message : err);
    process.exit(1);
  });
}

export default main;
