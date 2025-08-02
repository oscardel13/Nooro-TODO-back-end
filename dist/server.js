"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const app_1 = __importDefault(require("./app"));
const prisma_1 = __importDefault(require("./lib/prisma")); // or wherever you define the Prisma client
const PORT = process.env.PORT || 8000;
const NETWORK_IP = "127.0.0.1";
async function startServer() {
    try {
        // Test connection to DB
        await prisma_1.default.$connect();
        console.log("Connected to MySQL via Prisma");
        const server = http_1.default.createServer(app_1.default);
        server.listen(PORT, () => {
            console.log(`Server listening on http://${NETWORK_IP}:${PORT}`);
        });
        // Graceful shutdown
        process.on("SIGINT", async () => {
            await prisma_1.default.$disconnect();
            process.exit(0);
        });
    }
    catch (err) {
        console.error("Failed to connect to database", err);
        process.exit(1);
    }
}
startServer();
