import request from 'supertest';
import { beforeAll, afterAll, describe, it, expect } from 'vitest';
import app from '../server.js';
import { sequelize } from '../models/index.js';
import { runMigrations } from '../scripts/migrate.js';

let dbReady = false;
let token = '';
let stageId = 0;
let userId = 0;
let createdLeadIds: number[] = [];

const email = `integration.${Date.now()}@leadflow.io`;

beforeAll(async () => {
  try {
    await sequelize.authenticate();
    await runMigrations();
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    await Promise.all(
      ['activities', 'leads', 'lead_sources', 'stages', 'users'].map((t) =>
        sequelize.query(`TRUNCATE TABLE \`${t}\``)
      )
    );
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
    dbReady = true;
  } catch {
    console.warn('⏭️  Base de datos no disponible, pruebas de integración omitidas.');
    dbReady = false;
  }
});

afterAll(async () => {
  if (dbReady && createdLeadIds.length > 0) {
    try {
      await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
      for (const t of ['activities', 'leads', 'lead_sources', 'stages', 'users']) {
        await sequelize.query(`TRUNCATE TABLE \`${t}\``);
      }
      await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
    } catch {
      /* cleanup best-effort */
    }
  }
  await sequelize.close();
});

const authed = () => request(app).set('Authorization', `Bearer ${token}`);

describe('Full-stack integration flow against MySQL', () => {
  it.skipIf(!dbReady)('registers a user and returns a JWT', async () => {
    const res = await request(app).post('/api/v1/auth/register').send({
      name: 'Integration Tester',
      email,
      password: 'Password123!',
      role: 'admin',
    });
    expect(res.status).toBe(201);
    expect(res.body.token).toBeTruthy();
    userId = res.body.user.id;
    token = res.body.token;
  });

  it.skipIf(!dbReady)('creates a pipeline stage', async () => {
    const res = await authed().post('/api/v1/stages').send({
      name: 'Integración',
      color: '#22c55e',
      is_won: false,
      is_lost: false,
    });
    expect(res.status).toBe(201);
    stageId = res.body.stage.id;
  });

  it.skipIf(!dbReady)('creates a lead via the authenticated API', async () => {
    const res = await authed().post('/api/v1/leads').send({
      company_name: 'Acme Corp',
      contact_name: 'Jane Doe',
      email: 'jane@acme.io',
      phone: '+34 600 000 000',
      stage_id: stageId,
      value_amount: 15000,
      priority: 'high',
    });
    expect(res.status).toBe(201);
    createdLeadIds.push(res.body.lead.id);
  });

  it.skipIf(!dbReady)('lists leads with server-side filters and pagination', async () => {
    const res = await authed().get('/api/v1/leads').query({
      priority: 'high',
      search: 'acme',
      page: 1,
      limit: 5,
      sort_by: 'value_amount',
      sort_order: 'DESC',
    });
    expect(res.status).toBe(200);
    expect(res.body.pagination).toBeDefined();
    expect(res.body.leads.length).toBeGreaterThan(0);
    expect(res.body.leads[0].priority).toBe('high');
  });

  it.skipIf(!dbReady)('rejects invalid query params with 400', async () => {
    const res = await authed().get('/api/v1/leads').query({ limit: 999 });
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Validation Error');
  });

  it.skipIf(!dbReady)('moves a lead between stages', async () => {
    const leadId = createdLeadIds[0];
    const res = await authed().patch(`/api/v1/leads/${leadId}/stage`).send({ stage_id: stageId });
    expect(res.status).toBe(200);
    expect(res.body.lead.stage_id).toBe(stageId);
  });

  it.skipIf(!dbReady)('creates an activity for the lead', async () => {
    const leadId = createdLeadIds[0];
    const res = await authed().post('/api/v1/activities').send({
      lead_id: leadId,
      type: 'call',
      summary: 'Llamada de integración realizada',
    });
    expect(res.status).toBe(201);
    expect(res.body.activity.lead_id).toBe(leadId);
    expect(res.body.activity.user_id).toBe(userId);
  });

  it.skipIf(!dbReady)('loads overview metrics', async () => {
    const res = await authed().get('/api/v1/metrics/overview');
    expect(res.status).toBe(200);
    expect(res.body.metrics.total_leads).toBeGreaterThanOrEqual(1);
  });
});
