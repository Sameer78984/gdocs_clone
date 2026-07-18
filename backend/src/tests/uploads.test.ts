import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import app from '../app/app';
import fs from 'fs';
import path from 'path';

describe('Upload Endpoints', () => {
  let cookie: string;

  beforeEach(async () => {
    const res = await request(app).post('/api/auth/register').send({
      email: 'upload@example.com',
      name: 'Uploader',
      password: 'password123',
    });
    cookie = res.headers['set-cookie'];
  });

  it('should import a .txt file successfully', async () => {
    const testFilePath = path.join(__dirname, 'test.txt');
    fs.writeFileSync(testFilePath, 'This is test content');

    const res = await request(app)
      .post('/api/documents/import')
      .set('Cookie', cookie)
      .attach('file', testFilePath);

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.title).toBe('test');
    expect(res.body.data.content).toBe('This is test content');

    // Clean up
    fs.unlinkSync(testFilePath);
  });

  it('should reject invalid file types', async () => {
    const testFilePath = path.join(__dirname, 'test.js');
    fs.writeFileSync(testFilePath, 'console.log("hello")');

    const res = await request(app)
      .post('/api/documents/import')
      .set('Cookie', cookie)
      .attach('file', testFilePath);

    expect(res.status).toBe(400);

    fs.unlinkSync(testFilePath);
  });
});
