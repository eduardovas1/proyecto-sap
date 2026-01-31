import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';

import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const email = 'admin@demo.com';
  const passwordHash = await bcrypt.hash('123456', 10);

  await prisma.appUser.upsert({
    where: { email },
    update: {},
    create: {
        id: crypto.randomUUID(),
        email,
        passwordHash,
        role: 'ADMIN',
        isActive: true,
    },
  });

  console.log('ADMIN listo: admin@demo.com / 123456');
}

main().finally(async () => prisma.$disconnect());
