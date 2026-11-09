const { PrismaClient } = require("@prisma/client");

// Reuse a single Prisma client during development (nodemon reloads modules).
const globalForPrisma = globalThis;

const prisma =
  globalForPrisma.__pushtiPrisma ||
  new PrismaClient({
    log: process.env.PRISMA_LOG === "true" ? ["query", "warn", "error"] : ["warn", "error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.__pushtiPrisma = prisma;
}

module.exports = prisma;
