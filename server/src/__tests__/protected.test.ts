import request from 'supertest';
import { describe, it, expect } from 'vitest';
import app from '../server.js';

describe('Protected Endpoints (JWT)', () => {
  const protectedRoutes: { method: 'get' | 'post' | 'put' | 'patch' | 'delete'; path: string }[] = [
    { method: 'get', path: '/api/v1/stages' },
    { method: 'get', path: '/api/v1/leads' },
    { method: 'get', path: '/api/v1/activities' },
    { method: 'get', path: '/api/v1/metrics/overview' },
    { method: 'get', path: '/api/v1/metrics/pipeline' },
    { method: 'get', path: '/api/v1/metrics/sources' },
    { method: 'get', path: '/api/v1/metrics/reps' },
    { method: 'post', path: '/api/v1/leads' },
    { method: 'post', path: '/api/v1/stages' },
    { method: 'post', path: '/api/v1/stages/reorder' },
    { method: 'post', path: '/api/v1/activities' },
    { method: 'put', path: '/api/v1/leads/1' },
    { method: 'patch', path: '/api/v1/leads/1/stage' },
    { method: 'delete', path: '/api/v1/leads/1' },
  ];

  it.each(protectedRoutes)(
    'should reject $method $path with 401 when no Bearer token is provided',
    async ({ method, path }) => {
      const res = await request(app)[method](path).send({});
      expect(res.status).toBe(401);
      expect(res.body.error).toBe('Unauthorized');
    }
  );

  it('should reject access with an invalid Bearer token', async () => {
    const res = await request(app)
      .get('/api/v1/leads')
      .set('Authorization', 'Bearer this-is-not-a-valid-token');
    expect(res.status).toBe(401);
    expect(res.body.message).toBe('Token inválido o expirado.');
  });
});
