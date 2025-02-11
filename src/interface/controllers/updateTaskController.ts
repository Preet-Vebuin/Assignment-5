import { Request, Response } from "express";
import { updateTaskUseCase } from "../../application/use_cases/updateTaskUseCase";
import { TaskRepositoryPort } from "../../application/ports/repository/TaskRepositoryPort";
import { TaskType } from "../../domain/models/Task";

export const updateTaskController = (TaskRepo: TaskRepositoryPort) => async (req: Request, res: Response) => {
  try {
    const taskId = parseInt(req.params.id); // Get task ID from request params
    const { title, description, dueDate } : Partial<TaskType>= req.body;

    //  Pass repository instance and updated data
    const updatedTask = await updateTaskUseCase(TaskRepo, taskId, { title, description, dueDate });

    res.status(200).json(updatedTask);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
