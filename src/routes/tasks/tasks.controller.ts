import { Request, Response } from "express";
import {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} from "../../models/task/task.model";

// Get all tasks
export async function httpGetTasks(req: Request, res: Response) {
  try {
    const tasks = await getAllTasks();
    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
}

// Get task by ID
export async function httpGetTaskById(req: Request, res: Response) {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid task ID" });
  }

  try {
    const task = await getTaskById(id);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.status(200).json(task);
  } catch (error) {
    console.error(`Error fetching task ${id}:`, error);
    res.status(500).json({ error: "Failed to fetch task" });
  }
}

// Create a new task
export async function httpCreateTask(req: Request, res: Response) {
  const { title, color } = req.body;

  if (!title) {
    return res.status(400).json({ error: "Title are required" });
  }
  try {
    const task = await createTask({ title, color });
    res.status(201).json(task);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ error: "Failed to create task" });
  }
}

// Update a task
export async function httpUpdateTask(req: Request, res: Response) {
  const id = parseInt(req.params.id);
  const { title, color, completed } = req.body;

  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid task ID" });
  }

  try {
    const updatedTask = await updateTask(id, { title, color, completed });
    res.status(200).json(updatedTask);
  } catch (error) {
    console.error(`Error updating task ${id}:`, error);
    res.status(500).json({ error: "Failed to update task" });
  }
}

// Delete a task
export async function httpDeleteTask(req: Request, res: Response) {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid task ID" });
  }

  try {
    await deleteTask(id);
    res.status(204).send();
  } catch (error) {
    console.error(`Error deleting task ${id}:`, error);
    res.status(500).json({ error: "Failed to delete task" });
  }
}
