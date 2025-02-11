import { TaskRepositoryPort } from "../ports/repository/TaskRepositoryPort";

export const getAllTasksUseCase = async (taskRepository: TaskRepositoryPort) => {
  return taskRepository.getAll();
};
