"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tasks_controller_1 = require("./tasks.controller");
const TasksAPI = express_1.default.Router();
TasksAPI.get("/", tasks_controller_1.httpGetTasks);
TasksAPI.get("/:id", tasks_controller_1.httpGetTaskById);
TasksAPI.post("/", tasks_controller_1.httpCreateTask);
TasksAPI.put("/:id", tasks_controller_1.httpUpdateTask);
TasksAPI.delete("/:id", tasks_controller_1.httpDeleteTask);
exports.default = TasksAPI;
