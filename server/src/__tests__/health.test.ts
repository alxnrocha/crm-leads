import request from 'supertest';
import { describe, it, expect } from 'vitest';
import app from '../server.js';

describe('Healthcheck & API Info Endpoints', () => {
  it('GET /health should return 200 with status healthy', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('healthy');
  });

  it('GET /api/v1 should return API metadata', async () => {
    const res = await request(app).get('/api/v1');
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('CRM Leads API v1');
  });

  it('GET /api/docs.json should serve OpenAPI JSON spec', async () => {
    const res = await request(app).get('/api/docs.json');
    expect(res.status).toBe(200);
    expect(res.body.openapi).toBe('3.0.3');
  });
});
