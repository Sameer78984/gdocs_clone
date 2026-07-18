import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import app from '../app/app';

describe('Document Endpoints', () => {
  let cookie: string;
  let ownerId: string;

  beforeEach(async () => {
    const res = await request(app).post('/api/auth/register').send({
      email: 'docowner@example.com',
      name: 'Doc Owner',
      password: 'password123',
    });
    cookie = res.headers['set-cookie'];
    ownerId = res.body.data.user.id;
  });

  it('should create a new document', async () => {
    const res = await request(app)
      .post('/api/documents')
      .set('Cookie', cookie)
      .send({
        title: 'My First Doc',
        content: 'Hello World',
      });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.title).toBe('My First Doc');
    expect(res.body.data.owner.id).toBe(ownerId);
  });

  it('should rename a document', async () => {
    const createRes = await request(app)
      .post('/api/documents')
      .set('Cookie', cookie)
      .send({ title: 'Old Title', content: '' });
      
    const docId = createRes.body.data.id;

    const renameRes = await request(app)
      .patch(`/api/documents/${docId}/title`)
      .set('Cookie', cookie)
      .send({ title: 'New Title' });

    expect(renameRes.status).toBe(200);
    expect(renameRes.body.data.title).toBe('New Title');
  });

  it('should update document content', async () => {
    const createRes = await request(app)
      .post('/api/documents')
      .set('Cookie', cookie)
      .send({ title: 'Doc', content: 'Empty' });
      
    const docId = createRes.body.data.id;

    const updateRes = await request(app)
      .patch(`/api/documents/${docId}`)
      .set('Cookie', cookie)
      .send({ content: 'Full' });

    expect(updateRes.status).toBe(200);
    expect(updateRes.body.data.content).toBe('Full');
  });

  it('should prevent access without cookie', async () => {
    const res = await request(app).post('/api/documents').send({
      title: 'Hacked',
      content: '',
    });

    expect(res.status).toBe(401);
  });
});
