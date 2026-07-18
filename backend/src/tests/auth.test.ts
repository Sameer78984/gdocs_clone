import { describe, it, expect, beforeAll } from 'vitest';
import request from 'supertest';
import app from '../app/app';
import { prisma } from '../lib/prisma';

describe('Auth Endpoints', () => {
  it('should register a new user successfully', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'test@example.com',
        name: 'Test User',
        password: 'Password123!',
      });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.user.email).toBe('test@example.com');
    // HttpOnly cookie should be set
    expect(res.headers['set-cookie']).toBeDefined();
  });

  it('should prevent registering with an existing email', async () => {
    // Register first
    await request(app)
      .post('/api/auth/register')
      .send({
        email: 'duplicate@example.com',
        name: 'Test',
        password: 'Password123!',
      });

    // Try again
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'duplicate@example.com',
        name: 'Test 2',
        password: 'Password123!',
      });

    expect(res.status).toBe(409);
    expect(res.body.success).toBe(false);
  });

  it('should login an existing user successfully', async () => {
    await request(app)
      .post('/api/auth/register')
      .send({
        email: 'login@example.com',
        name: 'Login User',
        password: 'Password123!',
      });

    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'login@example.com',
        password: 'Password123!',
      });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.headers['set-cookie']).toBeDefined();
  });

  it('should fail login with wrong password', async () => {
    await request(app)
      .post('/api/auth/register')
      .send({
        email: 'wrongpass@example.com',
        name: 'Wrong Pass',
        password: 'Password123!',
      });

    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'wrongpass@example.com',
        password: 'WrongPass123!',
      });

    expect(res.status).toBe(401);
    expect(res.body.success).toBe(false);
  });
});
