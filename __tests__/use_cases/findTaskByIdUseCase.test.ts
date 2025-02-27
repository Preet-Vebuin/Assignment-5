import { findTaskByIdUseCase } from "../../src/application/use_cases/findTaskByIdUseCase";
import { mockTaskRepository, resetMockTaskRepository } from "../utils/mock/mockTaskRepository";
import { TaskType } from "../../src/domain/models/Task";

describe("findTaskByIdUseCase", () => {
  beforeEach(() => {
    resetMockTaskRepository();
  });

  test("should return a task when ID is valid", async () => {
    const mockTask: TaskType = { id: 0, title: "Test Task", description: "Mock task", dueDate: new Date() };
// if you put null instesd mockTask then it will gives the error
    mockTaskRepository.findById.mockResolvedValue(mockTask);

    const result = await findTaskByIdUseCase(mockTaskRepository, 1);

    expect(mockTaskRepository.findById).toHaveBeenCalledTimes(1);
    expect(mockTaskRepository.findById).toHaveBeenCalledWith(1);
    expect(result).toEqual(mockTask);
  });

  test("should return null if task ID does not exist", async () => {
    mockTaskRepository.findById.mockResolvedValue(null as any);

    const result = await findTaskByIdUseCase(mockTaskRepository, 999);

    expect(mockTaskRepository.findById).toHaveBeenCalledTimes(1);
    expect(result).toBeNull();
  });

  test("should throw an error if task ID is missing", async () => {
    await expect(findTaskByIdUseCase(mockTaskRepository, null as unknown as number)).rejects.toThrow(
      "Task ID is required"
    );
  });
});
