import { createTaskUseCase } from "../../src/application/use_cases/createTaskUseCase";
import { TaskRepositoryPort } from "../../src/application/ports/repository/TaskRepositoryPort";
import { TaskType } from "../../src/domain/models/Task";
import { mockTaskRepository, resetMockTaskRepository } from "../utils/mock/mockTaskRepository";


describe("createTaskUseCase", () => {
  beforeEach(() => {
    resetMockTaskRepository();
  });

  test("should create a task successfully", async () => {
    const taskData = { title: "Test Task", description: "This is a test", dueDate: new Date() };
    const mockTask: TaskType = { ...taskData, id: Number("123") };
    mockTaskRepository.create.mockResolvedValue(mockTask);

    const result = await createTaskUseCase(mockTaskRepository, taskData);

    expect(mockTaskRepository.create).toHaveBeenCalledTimes(1);
    expect(mockTaskRepository.create).toHaveBeenCalledWith(expect.objectContaining(taskData));
    expect(result).toEqual(mockTask);
  });

  test("should throw an error if title is missing", async () => {
    const taskData = { description: "No title task", dueDate: new Date() };
    await expect(createTaskUseCase(mockTaskRepository, taskData as TaskType)).rejects.toThrow("Title is required");
    expect(mockTaskRepository.create).not.toHaveBeenCalled();
  });

  test("should fail when database throws an error", async () => {
    mockTaskRepository.create.mockRejectedValue(new Error("Database connection failed"));
  
    await expect(createTaskUseCase(mockTaskRepository, { title: "New Task" }))
      .rejects.toThrow("Database connection failed");
  
    expect(mockTaskRepository.create).toHaveBeenCalledTimes(1);
  });
  
});
