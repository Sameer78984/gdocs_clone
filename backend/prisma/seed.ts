import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash('Password123!', 10);

  const alice = await prisma.user.upsert({
    where: { email: 'alice@example.com' },
    update: {},
    create: {
      email: 'alice@example.com',
      name: 'Alice',
      passwordHash,
    },
  });

  const bob = await prisma.user.upsert({
    where: { email: 'bob@example.com' },
    update: {},
    create: {
      email: 'bob@example.com',
      name: 'Bob',
      passwordHash,
    },
  });

  const document1 = await prisma.document.upsert({
    where: { id: '00000000-0000-0000-0000-000000000001' },
    update: {},
    create: {
      id: '00000000-0000-0000-0000-000000000001',
      title: 'Welcome to Ajaia Editor',
      content: '<h1>Welcome!</h1><p>This is a pre-seeded document.</p>',
      ownerId: alice.id,
    },
  });

  const document2 = await prisma.document.upsert({
    where: { id: '00000000-0000-0000-0000-000000000002' },
    update: {},
    create: {
      id: '00000000-0000-0000-0000-000000000002',
      title: 'Project Requirements',
      content: '<ul><li>Task 1</li><li>Task 2</li></ul>',
      ownerId: alice.id,
    },
  });

  // Share document1 with Bob
  await prisma.documentShare.upsert({
    where: {
      documentId_userId: {
        documentId: document1.id,
        userId: bob.id,
      },
    },
    update: {},
    create: {
      documentId: document1.id,
      userId: bob.id,
      permission: 'EDIT',
    },
  });

  console.log('Seed completed successfully:');
  console.log({ alice, bob });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
