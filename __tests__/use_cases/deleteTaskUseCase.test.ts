import { deleteTaskUseCase } from "../../src/application/use_cases/deleteTaskUseCase";
import { mockTaskRepository, resetMockTaskRepository } from "../utils/mock/mockTaskRepository";

describe("deleteTaskUseCase", () => {
  beforeEach(() => {
    resetMockTaskRepository();
  });

  test("should delete a task successfully", async () => {
    mockTaskRepository.delete.mockResolvedValue(true);

    const result = await deleteTaskUseCase(mockTaskRepository, 123); // Pass number

    expect(mockTaskRepository.delete).toHaveBeenCalledTimes(1);
    expect(mockTaskRepository.delete).toHaveBeenCalledWith(123);
    expect(result).toBe(true);
  });

  test("should return false if task ID does not exist", async () => {
    mockTaskRepository.delete.mockResolvedValue(false);

    const result = await deleteTaskUseCase(mockTaskRepository, 999); // Pass number

    expect(mockTaskRepository.delete).toHaveBeenCalledTimes(1);
    expect(result).toBe(false);
  });

  test("should throw an error if task ID is missing", async () => {
    await expect(deleteTaskUseCase(mockTaskRepository, undefined as unknown as number))
      .rejects.toThrow("Task ID is required");

    expect(mockTaskRepository.delete).not.toHaveBeenCalled();
  });
});
