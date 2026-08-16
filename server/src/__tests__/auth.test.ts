import request from 'supertest';
import { describe, it, expect } from 'vitest';
import app from '../server.js';

describe('Auth Endpoints Validation', () => {
  it('POST /api/v1/auth/register should fail validation if email is missing', async () => {
    const res = await request(app).post('/api/v1/auth/register').send({
      name: 'Test User',
      password: 'password123',
    });
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Validation Error');
  });

  it('POST /api/v1/auth/login should fail validation if password is missing', async () => {
    const res = await request(app).post('/api/v1/auth/login').send({
      email: 'test@leadflow.io',
    });
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Validation Error');
  });

  it('GET /api/v1/auth/me should return 401 Unauthorized without Bearer token', async () => {
    const res = await request(app).get('/api/v1/auth/me');
    expect(res.status).toBe(401);
    expect(res.body.error).toBe('Unauthorized');
  });
});
