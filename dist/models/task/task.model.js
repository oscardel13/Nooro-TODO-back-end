"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllTasks = getAllTasks;
exports.getTaskById = getTaskById;
exports.createTask = createTask;
exports.updateTask = updateTask;
exports.deleteTask = deleteTask;
const prisma_1 = __importDefault(require("../../lib/prisma")); // adjust path as needed
// IMPORT TYPES FROM task.types
const task = prisma_1.default.task;
async function getAllTasks() {
    return await task.findMany({
        orderBy: { createdAt: "desc" },
    });
}
async function getTaskById(id) {
    return await task.findUnique({
        where: { id },
    });
}
async function createTask(data) {
    return await task.create({
        data,
    });
}
async function updateTask(id, data) {
    return await task.update({
        where: { id },
        data,
    });
}
async function deleteTask(id) {
    return await task.delete({
        where: { id },
    });
}
