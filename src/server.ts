import http from "http";
import app from "./app";
import prisma from "./lib/prisma"; // or wherever you define the Prisma client

const PORT = process.env.PORT || 8000;
const NETWORK_IP = "127.0.0.1";

async function connectWithRetry(retries = 5, delay = 3000) {
  for (let i = 0; i < retries; i++) {
    try {
      await prisma.$connect();
      console.log("✅ Connected to the database");
      return;
    } catch (err) {
      if (err instanceof Error) {
        console.error(
          `❌ Failed to connect to DB (attempt ${i + 1} of ${retries}):`,
          err.message
        );
      } else {
        console.error(
          `❌ Failed to connect to DB (attempt ${i + 1} of ${retries}):`,
          err
        );
      }
      if (i < retries - 1) {
        console.log(`⏳ Retrying in ${delay / 1000}s...`);
        await new Promise((res) => setTimeout(res, delay));
      } else {
        console.error(
          "💥 Could not connect to the database after retries. Exiting."
        );
        process.exit(1);
      }
    }
  }
}

async function startServer() {
  try {
    // Test connection to DB
    connectWithRetry();
    console.log("Connected to MySQL via Prisma");

    const server = http.createServer(app);
    server.listen(PORT, () => {
      console.log(`Server listening on http://${NETWORK_IP}:${PORT}`);
    });

    // Graceful shutdown
    process.on("SIGINT", async () => {
      await prisma.$disconnect();
      process.exit(0);
    });
  } catch (err) {
    console.error("Failed to connect to database", err);
    process.exit(1);
  }
}

startServer();
