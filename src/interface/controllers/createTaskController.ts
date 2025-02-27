import { Request, Response } from "express";
import { createTaskUseCase } from "../../application/use_cases/createTaskUseCase";
import { TaskRepositoryPort } from "../../application/ports/repository/TaskRepositoryPort";

export const createTaskController = (TaskRepo: TaskRepositoryPort) => async (req: Request, res: Response) => {
  try {
    const { title, description, dueDate } = req.body;

    const task = await createTaskUseCase(TaskRepo, { title, description, dueDate });

    res.status(201).json(task);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
