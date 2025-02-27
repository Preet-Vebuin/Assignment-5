import { getAllTasksUseCase } from "../../src/application/use_cases/getAllTasksUseCase";
import { mockTaskRepository, resetMockTaskRepository } from "../utils/mock/mockTaskRepository";
import { TaskType } from "../../src/domain/models/Task";

describe("getAllTasksUseCase", () => {
  beforeEach(() => {
    resetMockTaskRepository();
  });

  test("should return all tasks successfully", async () => {
    const mockTasks: TaskType[] = [
      { id: 1, title: "Task 1", description: "Description 1", dueDate: new Date() },
      { id: 2, title: "Task 2", description: "Description 2", dueDate: new Date() },
    ];

    mockTaskRepository.getAll.mockResolvedValue(mockTasks);

    const result = await getAllTasksUseCase(mockTaskRepository);

    expect(mockTaskRepository.getAll).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockTasks);
  });

  test("should return an empty array if there are no tasks", async () => {
    mockTaskRepository.getAll.mockResolvedValue([]);

    const result = await getAllTasksUseCase(mockTaskRepository);

    expect(mockTaskRepository.getAll).toHaveBeenCalledTimes(1);
    expect(result).toEqual([]);
  });

  test("should throw an error if repository throws an error", async () => {
    mockTaskRepository.getAll.mockRejectedValue(new Error("Database error"));

    await expect(getAllTasksUseCase(mockTaskRepository)).rejects.toThrow("Database error");
    expect(mockTaskRepository.getAll).toHaveBeenCalledTimes(1);
  });
});
