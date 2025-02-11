import { Request, Response } from "express";
import { deleteTaskUseCase } from "../../application/use_cases/deleteTaskUseCase";
import { TaskRepositoryPort } from "../../application/ports/repository/TaskRepositoryPort";

export const deleteTaskController = (TaskRepo: TaskRepositoryPort) => async (req: Request, res: Response) => {
  try {
    const taskId = parseInt(req.params.id); // Get task ID from request params

    const isDeleted = await deleteTaskUseCase(TaskRepo, taskId);

    if (isDeleted) {
      res.status(200).json({ message: "Task deleted successfully" });
    } else {
      res.status(404).json({ error: "Task not found" });
    }
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
