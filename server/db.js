const prisma = require("./lib/prisma");

// Kept as a small compatibility helper; all data access now goes through Prisma.
const connectToDatabase = async () => {
  await prisma.$connect();
  return prisma;
};

module.exports = connectToDatabase;
module.exports.prisma = prisma;
