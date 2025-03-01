import { Request, Response } from "express";
import { createTaskUseCase } from "../../application/use_cases/createTaskUseCase";
import { TaskRepositoryPort } from "../../application/ports/repository/TaskRepositoryPort";
import Joi from "joi";

// SQL injection pattern to prevent dangerous SQL keywords
const sqlInjectionPattern = /(SELECT|INSERT|UPDATE|DELETE|DROP|ALTER|CREATE|EXEC|UNION|--|\*|;)/i;

// Joi schema for validating input
const taskSchema = Joi.object({
  title: Joi.string()
    .min(3)
    .max(50)
    .pattern(new RegExp(`^(?!.*${sqlInjectionPattern.source})`)) // Prevent SQL injection
    .required()
    .messages({
      "string.pattern.base": "Invalid input: Title contains forbidden SQL keywords",
      "string.min": "Title length must be between 3 and 50 characters",
      "string.max": "Title length must be between 3 and 50 characters",
      "any.required": "Title is required",
    }),
  description: Joi.string().min(5).max(500).optional(),
  dueDate: Joi.date().iso().optional(),
});

// Controller to handle creating a task
export const createTaskController = (TaskRepo: TaskRepositoryPort) => {
  return async (req: Request, res: Response): Promise<void> => {
    try {
      // Validate request body using Joi
      const { error } = taskSchema.validate(req.body);
      if (error) {
        res.status(400).json({ message: error.details[0].message });
        return;
      }

      const { title, description, dueDate } = req.body;

      // Check if task with the same title already exists
      const existingTask = await TaskRepo.findByTitle(title);
      if (existingTask) {
        res.status(409).json({ message: "Todo with this title already exists" });
        return;
      }

      // Use case for creating a new task
      const task = await createTaskUseCase(TaskRepo, { title, description, dueDate });

      // Ensure that the task is persisted and has an id
      if (task) {
        res.status(201).json({
          message: "Todo Created Successfully",
          task, // Send the created task object, which should include the id
        });
      } else {
        res.status(500).json({ message: "Task creation failed" });
      }
    } catch (error: any) {
      console.error("Server Error:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
};
