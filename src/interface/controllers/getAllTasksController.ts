import { Request, Response } from "express";
import { getAllTasksUseCase } from "../../application/use_cases/getAllTasksUseCase";
import { TaskRepositoryPort } from "../../application/ports/repository/TaskRepositoryPort";

export const getAllTasksController = (TaskRepo: TaskRepositoryPort) => async (req: Request, res: Response) => {
  try {
    //  Pass repository instance
    const tasks = await getAllTasksUseCase(TaskRepo);

    res.status(200).json(tasks);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
