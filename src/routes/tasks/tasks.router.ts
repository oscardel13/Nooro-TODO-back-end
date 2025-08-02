import express, { Request, Response, Router } from "express";

import {
  httpGetTasks,
  httpGetTaskById,
  httpCreateTask,
  httpUpdateTask,
  httpDeleteTask,
} from "./tasks.controller";

const TasksAPI: Router = express.Router();

TasksAPI.get("/", httpGetTasks);
TasksAPI.get("/:id", httpGetTaskById);
TasksAPI.post("/", httpCreateTask);
TasksAPI.put("/:id", httpUpdateTask);
TasksAPI.delete("/:id", httpDeleteTask);

export default TasksAPI;
