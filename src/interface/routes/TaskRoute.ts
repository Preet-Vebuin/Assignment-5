import express from "express";
import {createTaskController} from "../controllers/createTaskController"
import { TaskRepository } from "../../infrastructure/repository/TaskRepository";
import {getAllTasksController} from "../controllers/getAllTasksController"
import { updateTaskController } from "../controllers/updateTaskController";
import {deleteTaskController} from "../controllers/deleteTaskController"
import {findTaskByIdController} from "../controllers/findTaskByIdController"


export const taskRouter = express.Router();

// Route for updating a task
taskRouter.put("/:id", updateTaskController(TaskRepository));

// create task  
taskRouter.post('/', createTaskController(TaskRepository))

taskRouter.get("/", getAllTasksController(TaskRepository));
taskRouter.get("/:id", findTaskByIdController(TaskRepository));

taskRouter.delete("/:id",deleteTaskController(TaskRepository) )

