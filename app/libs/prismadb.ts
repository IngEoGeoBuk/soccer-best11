import { PrismaClient } from '@prisma/client';

// eslint-disable-next-line no-var, import/no-mutable-exports
var prisma: PrismaClient | undefined;

if (typeof window === 'undefined') {
  if (process.env.NODE_ENV === 'production') {
    prisma = new PrismaClient();
  } else {
    const globalWithPrisma = global as typeof globalThis & {
      prisma: PrismaClient;
    };
    if (!globalWithPrisma.prisma) {
      globalWithPrisma.prisma = new PrismaClient();
    }
    prisma = globalWithPrisma.prisma;
  }
}

export default prisma;
