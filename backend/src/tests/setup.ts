import { beforeAll, afterAll, afterEach } from 'vitest';
import { prisma } from '../lib/prisma';

beforeAll(async () => {
  // Any global setup before tests
});

afterEach(async () => {
  // Clean up database after each test
  await prisma.$executeRawUnsafe(`TRUNCATE TABLE "DocumentShare", "Document", "User" RESTART IDENTITY CASCADE;`);
});

afterAll(async () => {
  await prisma.$disconnect();
});
