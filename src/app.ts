import express, { Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import api from "./routes/api";

const app = express();

app.use(helmet());

app.use(cors());

app.use(morgan("combined"));

app.use((req: Request, res: Response, next) => {
  const start = Date.now();
  next();
  const delta = Date.now() - start;
  console.log(`${req.method} ${req.baseUrl}${req.url} ${delta}ms`);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/", api);

export default app;
