import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { createApp } from '../src/app.js';

const app = createApp({
  validatorApiUrl: 'http://localhost:8080',
});

global.fetch = async () => ({
  ok: true,
  async json() {
    return { valid: true, errors: [] };
  },
});

describe('catalog routes', () => {
  it('returns 400 when required fields are missing', async () => {
    const response = await request(app).post('/api/catalog/enrich').send({ name: 'Missing fields' });
    expect(response.status).toBe(400);
  });
});
