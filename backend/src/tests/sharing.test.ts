import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import app from '../app/app';

describe('Sharing Endpoints', () => {
  let ownerCookie: string;
  let docId: string;
  let otherEmail = 'other@example.com';

  beforeEach(async () => {
    // 1. Register Owner
    const ownerRes = await request(app).post('/api/auth/register').send({
      email: 'owner@example.com',
      name: 'Owner',
      password: 'Password123!',
    });
    ownerCookie = ownerRes.headers['set-cookie'];

    // 2. Register Other User
    await request(app).post('/api/auth/register').send({
      email: otherEmail,
      name: 'Other',
      password: 'Password123!',
    });

    // 3. Create Document
    const docRes = await request(app)
      .post('/api/documents')
      .set('Cookie', ownerCookie)
      .send({ title: 'Shared Doc', content: '' });
    docId = docRes.body.data.id;
  });

  it('should share document successfully', async () => {
    const res = await request(app)
      .post(`/api/documents/${docId}/shares`)
      .set('Cookie', ownerCookie)
      .send({ email: otherEmail, permission: 'READ' });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.user.email).toBe(otherEmail);
    expect(res.body.data.permission).toBe('READ');
  });

  it('should reject sharing with non-existent user', async () => {
    const res = await request(app)
      .post(`/api/documents/${docId}/shares`)
      .set('Cookie', ownerCookie)
      .send({ email: 'ghost@example.com', permission: 'READ' });

    expect(res.status).toBe(404);
  });

  it('should reject duplicate share', async () => {
    // Share once
    await request(app)
      .post(`/api/documents/${docId}/shares`)
      .set('Cookie', ownerCookie)
      .send({ email: otherEmail, permission: 'READ' });

    // Share again
    const res = await request(app)
      .post(`/api/documents/${docId}/shares`)
      .set('Cookie', ownerCookie)
      .send({ email: otherEmail, permission: 'READ' });

    expect(res.status).toBe(409); // Conflict
  });
});
