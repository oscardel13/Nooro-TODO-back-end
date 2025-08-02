"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import cors from "cors";
// import morgan from "morgan";
const helmet_1 = __importDefault(require("helmet"));
const api_1 = __importDefault(require("./routes/api"));
const app = (0, express_1.default)();
app.use((0, helmet_1.default)());
// app.use(cors());
// app.use(morgan("combined"));
app.use((req, res, next) => {
    const start = Date.now();
    next();
    const delta = Date.now() - start;
    console.log(`${req.method} ${req.baseUrl}${req.url} ${delta}ms`);
});
app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.use("/", api_1.default);
exports.default = app;
