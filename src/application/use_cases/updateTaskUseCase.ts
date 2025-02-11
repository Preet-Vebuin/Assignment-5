import { TaskType } from "../../domain/models/Task";
import { TaskRepositoryPort } from "../ports/repository/TaskRepositoryPort";

export const updateTaskUseCase = async (
  taskRepository: TaskRepositoryPort,
  taskId: number,
  updatedData: Partial<TaskType>
) => {
  if (!taskId) {
    throw new Error("Task ID is required");
  }

  return taskRepository.update(taskId, updatedData);
};
