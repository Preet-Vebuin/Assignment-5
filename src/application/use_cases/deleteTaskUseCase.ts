import { TaskRepositoryPort } from "../ports/repository/TaskRepositoryPort";

export const deleteTaskUseCase = async (taskRepository: TaskRepositoryPort, taskId: number): Promise<boolean> => {
  if (!taskId) {
    throw new Error("Task ID is required");
  }

  return taskRepository.delete(taskId);
};
