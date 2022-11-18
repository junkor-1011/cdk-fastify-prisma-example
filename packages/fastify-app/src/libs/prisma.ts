import { PrismaClient } from '@prisma/client';
export const prisma = new PrismaClient({
  log: [
    // TODO: switch by env
    'query',
    'info',
    'warn',
    'error',
  ],
});
