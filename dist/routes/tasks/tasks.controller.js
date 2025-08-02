"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpGetTasks = httpGetTasks;
exports.httpGetTaskById = httpGetTaskById;
exports.httpCreateTask = httpCreateTask;
exports.httpUpdateTask = httpUpdateTask;
exports.httpDeleteTask = httpDeleteTask;
const task_model_1 = require("../../models/task/task.model");
// Get all tasks
async function httpGetTasks(req, res) {
    try {
        const tasks = await (0, task_model_1.getAllTasks)();
        res.status(200).json(tasks);
    }
    catch (error) {
        console.error("Error fetching tasks:", error);
        res.status(500).json({ error: "Failed to fetch tasks" });
    }
}
// Get task by ID
async function httpGetTaskById(req, res) {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid task ID" });
    }
    try {
        const task = await (0, task_model_1.getTaskById)(id);
        if (!task) {
            return res.status(404).json({ error: "Task not found" });
        }
        res.status(200).json(task);
    }
    catch (error) {
        console.error(`Error fetching task ${id}:`, error);
        res.status(500).json({ error: "Failed to fetch task" });
    }
}
// Create a new task
async function httpCreateTask(req, res) {
    const { title, color } = req.body;
    if (!title) {
        return res.status(400).json({ error: "Title are required" });
    }
    console.log("HERE====================");
    try {
        const task = await (0, task_model_1.createTask)({ title, color });
        res.status(201).json(task);
    }
    catch (error) {
        console.error("Error creating task:", error);
        res.status(500).json({ error: "Failed to create task" });
    }
}
// Update a task
async function httpUpdateTask(req, res) {
    const id = parseInt(req.params.id);
    const { title, color, completed } = req.body;
    if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid task ID" });
    }
    try {
        const updatedTask = await (0, task_model_1.updateTask)(id, { title, color, completed });
        res.status(200).json(updatedTask);
    }
    catch (error) {
        console.error(`Error updating task ${id}:`, error);
        res.status(500).json({ error: "Failed to update task" });
    }
}
// Delete a task
async function httpDeleteTask(req, res) {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid task ID" });
    }
    try {
        await (0, task_model_1.deleteTask)(id);
        res.status(204).send();
    }
    catch (error) {
        console.error(`Error deleting task ${id}:`, error);
        res.status(500).json({ error: "Failed to delete task" });
    }
}
