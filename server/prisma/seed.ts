import { PrismaClient } from '@prisma/client';

import fakeUsers from '../data/users';
import fakeRecipes from '../data/recipes';
const prisma = new PrismaClient();

async function main() {
  await prisma.user.createMany({
    data: fakeUsers,
  });

  await prisma.recipe.createMany({
    data: fakeRecipes,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
