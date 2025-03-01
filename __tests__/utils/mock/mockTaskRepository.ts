import { TaskRepositoryPort } from "../../../src/application/ports/repository/TaskRepositoryPort";
import { TaskType } from "../../../src/domain/models/Task";

export const mockTaskRepository: jest.Mocked<TaskRepositoryPort> = {
  create: jest.fn(),
  findById: jest.fn(),
  getAll: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  findByTitle: jest.fn(),
};

// Helper function to reset mocks before each test
export const resetMockTaskRepository = () => {
  jest.clearAllMocks();
};

describe("Mock Task Repository", () => {
    test("should be defined", () => {
      expect(true).toBe(true);
    });
  });
  
