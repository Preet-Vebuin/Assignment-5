import express from "express";
import request from "supertest";
import dotenv from "dotenv";
import { AppDataSource } from "../../src/infrastructure/orm/typeorm/config/ormconfig";
import { Task } from "../../src/infrastructure/orm/typeorm/entities/TaskEntity";
import { taskRouter } from "../../src/interface/routes/TaskRoute";

dotenv.config();

const app = express();
app.use(express.json());
app.use("/todo", taskRouter);

beforeAll(async () => {
  await AppDataSource.initialize();
  const taskRepository = AppDataSource.getRepository(Task);

  const tasks = [
    { title: "Complete Task", description: "Finish the assignment", dueDate: new Date("2025-03-10T12:00:000Z") },
    { title: "Duplicate Task", description: "This already exists", dueDate: new Date("2025-03-10T12:00:000Z") },
  ];

  await taskRepository.save(tasks.map(task => Object.assign(new Task(), task)));
});

afterAll(async () => {
  const taskRepository = AppDataSource.getRepository(Task);
  await taskRepository.clear(); // Clears all rows
  await AppDataSource.destroy();
});

describe("POST /todo", () => {
  it("should create a new todo successfully", async () => {
    const newTodo = {
      title: "New Task",
      description: "A fresh task",
      dueDate: "2025-03-10T12:00:00Z",
    };

    const response = await request(app).post("/todo").send(newTodo);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("message", "Todo Created Successfully");
    expect(response.body.task).toMatchObject({
      id: expect.any(Number),
      title: newTodo.title,
      description: newTodo.description,
      dueDate: new Date(newTodo.dueDate).toISOString(),
    });
  });

  it("should prevent SQL injection attempts", async () => {
    const maliciousTodo = {
      title: "DROP TABLE tasks;",
      description: "SQL Injection Test",
      dueDate: "2025-03-10T12:00:00Z",
    };

    const response = await request(app).post("/todo").send(maliciousTodo);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "Invalid input: Title contains forbidden SQL keywords");
  });

  it("should return 409 if todo title already exists", async () => {
    const duplicateTodo = {
      title: "Duplicate Task",
      description: "This already exists",
      dueDate: "2025-03-10T12:00:00Z",
    };

    const response = await request(app).post("/todo").send(duplicateTodo);

    expect(response.status).toBe(409);
    expect(response.body).toHaveProperty("message", "Todo with this title already exists");
  });

  it("should return 400 if title length exceeds limit", async () => {
    const longTitleTodo = {
      title: "A".repeat(51),
      description: "Too long title",
      dueDate: "2025-03-10T12:00:00Z",
    };

    const response = await request(app).post("/todo").send(longTitleTodo);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "Title length must be between 3 and 50 characters");
  });
});
