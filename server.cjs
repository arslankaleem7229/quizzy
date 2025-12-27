"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import { createServer } from "node:http";
const next_1 = __importDefault(require("next"));
const socket_io_1 = require("socket.io");
const http_1 = __importDefault(require("http"));
const dev = false;
const port = parseInt(process.env.PORT || "3000", 10);
const app = (0, next_1.default)({ dev });
const handler = app.getRequestHandler();
console.log("Starting Next.js application...");
async function start() {
    await app.prepare();
    const server = http_1.default.createServer((req, res) => {
        handler(req, res);
    });
    const io = new socket_io_1.Server(server);
    io.on("connection", (socket) => {
        console.log("Client connected:", socket.id);
        socket.on("join-user-room", (userId) => {
            socket.join(`user:${userId}`);
            console.log(`User ${userId} joined room`);
        });
        socket.on("subscribe-job", (jobId) => {
            socket.join(`job:${jobId}`);
            console.log(`Subscribed to job ${jobId}`);
        });
        socket.on("disconnect", () => {
            console.log("Client disconnected:", socket.id);
        });
    });
    global.io = io;
    server.listen(port, "0.0.0.0", () => {
        console.log(`Server ready on http://0.0.0.0:${port}`);
        console.log("Socket.IO ready");
    });
}
start();
// app.prepare().then(() => {
//   const httpServer = createServer(handler);
// const io = new Server(httpServer, {
//   cors: {
//     origin: process.env.NEXT_PUBLIC_APP_URL || "*",
//     credentials: true,
//   },
//   transports: ["websocket", "polling"],
// });
// io.on("connection", (socket) => {
//   console.log("Client connected:", socket.id);
//   socket.on("join-user-room", (userId) => {
//     socket.join(`user:${userId}`);
//     console.log(`User ${userId} joined room`);
//   });
//   socket.on("subscribe-job", (jobId) => {
//     socket.join(`job:${jobId}`);
//     console.log(`Subscribed to job ${jobId}`);
//   });
//   socket.on("disconnect", () => {
//     console.log("Client disconnected:", socket.id);
//   });
// });
// global.io = io;
//   httpServer
//     .once("error", (err) => {
//       console.error("Server error:", err);
//       process.exit(1);
//     })
//     .listen(port, () => {
//       console.log(`Server ready on http://${"0.0.0.0"}:${port}`);
//       console.log(`Socket.IO ready`);
//     });
// });
