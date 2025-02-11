import { Request, Response } from "express";
import { findTaskByIdUseCase } from "../../application/use_cases/findTaskByIdUseCase";
import { TaskRepositoryPort } from "../../application/ports/repository/TaskRepositoryPort";

export const findTaskByIdController = (TaskRepo: TaskRepositoryPort) => {
  return async (req: Request, res: Response) => {
    try {
      const taskId = parseInt(req.params.id);

    //   if (isNaN(taskId)) {
    // error occured due to  this
    //     return res.status(400).json({ error: "Invalid Task ID" }) as any;
    //   }

      // Fetch the task
      const task = await findTaskByIdUseCase(TaskRepo, taskId);

      res.status(200).json(task);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };
};
