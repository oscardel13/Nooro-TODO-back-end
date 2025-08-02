import prisma from "../../lib/prisma"; // adjust path as needed

// IMPORT TYPES FROM task.types

const task = prisma.task;

export async function getAllTasks() {
  return await task.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function getTaskById(id: number) {
  return await task.findUnique({
    where: { id },
  });
}

export async function createTask(data: {
  title: string;
  color: string;
  completed?: boolean;
}) {
  return await task.create({
    data,
  });
}

export async function updateTask(
  id: number,
  data: Partial<{
    title: string;
    color: string;
    completed: boolean;
  }>
) {
  return await task.update({
    where: { id },
    data,
  });
}

export async function deleteTask(id: number) {
  return await task.delete({
    where: { id },
  });
}
