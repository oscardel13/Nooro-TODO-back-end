import express, { Request, Response, Router } from "express";

import TasksRouter from "./tasks/tasks.router";

const api: Router = express.Router();

api.use("/tasks", express.json(), TasksRouter);

export default api;
