import { Sequelize } from 'sequelize';
import { config } from './env.js';

const isProduction = config.nodeEnv === 'production';

export const sequelize = new Sequelize(config.db.database, config.db.user, config.db.password, {
  host: config.db.host,
  port: config.db.port,
  dialect: 'mysql',
  logging: isProduction ? false : (msg) => console.log(`[SQL] ${msg}`),
  define: {
    timestamps: true,
    underscored: true,
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_ci',
  },
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

export async function testDatabaseConnection(): Promise<boolean> {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexión con base de datos MySQL establecida correctamente.');
    return true;
  } catch (error) {
    console.warn('⚠️ No se pudo conectar al servidor MySQL:', (error as Error).message);
    return false;
  }
}
