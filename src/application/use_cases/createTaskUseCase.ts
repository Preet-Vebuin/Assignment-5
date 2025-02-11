import { TaskType } from "../../domain/models/Task";
import { TaskRepositoryPort } from "../ports/repository/TaskRepositoryPort";

export const createTaskUseCase = async (
  taskRepository: TaskRepositoryPort,
  taskData: { title: string; description?: string; dueDate?: Date }
) => {
  if (!taskData.title) {
    throw new Error("Title is required");
  }

  //  Convert dueDate to a Date object if provided
  const dueDate = taskData.dueDate ? new Date(taskData.dueDate) : undefined;

  return taskRepository.create({
    title: taskData.title,
    description: taskData.description,
    dueDate,
  } as TaskType);
};
