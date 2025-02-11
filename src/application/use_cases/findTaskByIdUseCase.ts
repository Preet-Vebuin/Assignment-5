import { TaskRepositoryPort } from "../ports/repository/TaskRepositoryPort";

export const findTaskByIdUseCase = async (taskRepository: TaskRepositoryPort, taskId: number) => {
  if (!taskId) {
    throw new Error("Task ID is required");
  }

  return taskRepository.findById(taskId);
};
