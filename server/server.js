const path = require("path");
const dotenv = require("dotenv");

dotenv.config({ path: path.join(__dirname, ".env") });

const app = require("./app");
const prisma = require("./lib/prisma");

const port = Number(process.env.PORT) || 5000;

const start = async () => {
  try {
    await prisma.$connect();
    const server = app.listen(port, () => {
      console.log(`Server Started on ${port}`);
    });

    const shutdown = async (signal) => {
      console.log(`\n${signal} received, closing server...`);
      server.close(async () => {
        await prisma.$disconnect();
        process.exit(0);
      });
    };

    process.on("SIGINT", () => shutdown("SIGINT"));
    process.on("SIGTERM", () => shutdown("SIGTERM"));
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

start();
