import { updateTaskUseCase } from "../../src/application/use_cases/updateTaskUseCase";
import { mockTaskRepository, resetMockTaskRepository } from "../utils/mock/mockTaskRepository";
import { TaskType } from "../../src/domain/models/Task";

describe("updateTaskUseCase", () => {
  beforeEach(() => {
    resetMockTaskRepository();
  });

  test("should update a task successfully", async () => {
    const taskId = 1;
    const updatedData: Partial<TaskType> = { title: "Updated Task Title" };
    const mockUpdatedTask: TaskType = { id: taskId, title: "Updated Task Title", description: "Old Description", dueDate: new Date() };

    mockTaskRepository.update.mockResolvedValue(mockUpdatedTask);

    const result = await updateTaskUseCase(mockTaskRepository, taskId, updatedData);

    expect(mockTaskRepository.update).toHaveBeenCalledTimes(1);
    expect(mockTaskRepository.update).toHaveBeenCalledWith(taskId, updatedData);
    expect(result).toEqual(mockUpdatedTask);
  });

  test("should throw an error if task ID is missing", async () => {
    const updatedData: Partial<TaskType> = { title: "Updated Task Title" };

    await expect(updateTaskUseCase(mockTaskRepository, undefined as unknown as number, updatedData)).rejects.toThrow("Task ID is required");

    expect(mockTaskRepository.update).not.toHaveBeenCalled();
  });

  test("should return null if task ID does not exist", async () => {
    const taskId = 999;
    const updatedData: Partial<TaskType> = { title: "Non-existent Task" };

    mockTaskRepository.update.mockResolvedValue(null as any );

    const result = await updateTaskUseCase(mockTaskRepository, taskId, updatedData);

    expect(mockTaskRepository.update).toHaveBeenCalledTimes(1);
    expect(result).toBeNull();
  });
});
