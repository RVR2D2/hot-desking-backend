import { randomUUID } from 'crypto';
import { PrismaClient, UserRole, UserStatus } from 'generated/prisma/client';
import { config, Hasher } from 'src/common';

export const seedUser = async (prisma: PrismaClient): Promise<void> => {
  const { email, password, lastName, firstName } = config.seedUser;

  console.log('Seeding user');

  if (!(email && password && lastName && firstName)) {
    console.log('Seed user is not configure. skipping.');
    return;
  }

  const user = await prisma.user.findFirst({
    where: { email: { equals: email, mode: 'insensitive' } },
  });

  if (user) {
    console.log(`User ${email} all ready exists. Skipping.`);
    return;
  }

  const id = randomUUID();
  const hash = await Hasher.hash(password);

  await prisma.user.create({
    data: {
      id,
      email,
      role: UserRole.admin,
      firstName,
      lastName,
      hash,
      status: UserStatus.active,
      createdBy: id,
    },
  });
};
