import { AppDataSource } from "../orm/typeorm/config/ormconfig";
import { Task } from "../orm/typeorm/entities/TaskEntity";
import { TaskRepositoryPort } from "../../application/ports/repository/TaskRepositoryPort";
import { TaskType } from "../../domain/models/Task";

export const TaskRepository: TaskRepositoryPort = {
  // create: async function (task: Omit<TaskType, "id">): Promise<TaskType> {
  //   console.log("Creating Task:", task); // Log input data
  
  //   const result = await AppDataSource.getRepository(Task)
  //     .createQueryBuilder()
  //     .insert()
  //     .into(Task)
  //     .values({
  //       title: task.title,
  //       description: task.description,
  //       dueDate: task.dueDate, // Convert Date to MySQL DATETIME format
  //     })
  //     .execute();
  
  //   console.log("Insert Result:", result); // Log insert result
  
  //   const insertedId = result.identifiers[0]?.id;
  //   console.log("Inserted Task ID:", insertedId); // Log inserted ID
  
  //   if (!insertedId) {
  //     throw new Error("Task creation failed: No ID returned");
  //   }
  
  //   // Fetch the created task from the database
  //   const createdTask = await AppDataSource.getRepository(Task)
  //     .createQueryBuilder("task")
  //     .where("task.id = :id", { id: insertedId })
  //     .getOne();
  
  //   console.log("Fetched Task:", createdTask); // Log fetched task
  
  //   if (!createdTask) {
  //     throw new Error("Task creation failed: Unable to retrieve inserted task");
  //   }
  
  //   return createdTask;
  // },
  
  create: async function (task: Omit<TaskType, "id">): Promise<TaskType> {
    const taskRepository = AppDataSource.getRepository(Task);
  
    // Insert the task and return the generated row
    const result = await taskRepository.save(task);
    console.log("Inserted Task:", result); // ✅ Check if task was inserted properly
  
    if (!result.id) {
      throw new Error("Task creation failed: No ID returned");
    }
  
    // Fetch the created task from DB (optional, since `save()` already returns it)
    const createdTask = await taskRepository.findOneBy({ id: result.id });
  
    if (!createdTask) {
      throw new Error("Task creation failed: Unable to retrieve inserted task");
    }
  
    return createdTask;
  },
  
  getAll: async function () : Promise<TaskType[]> {
      return await AppDataSource.getRepository(Task)
        .createQueryBuilder("task")
        .getMany(); //  Fetch all tasks from the database
    },  

  update: async function (id: number, updatedData: Partial<TaskType>): Promise<TaskType> {
    const taskRepository = AppDataSource.getRepository(Task);

    // Check if task exists
    const existingTask = await taskRepository.findOneBy({ id });
    if (!existingTask) {
      throw new Error("Task not found");
    }

    // Perform the update
    await taskRepository
      .createQueryBuilder()
      .update(Task)
      .set({
        title: updatedData.title ?? existingTask.title,
        description: updatedData.description ?? existingTask.description,
        dueDate: updatedData.dueDate ? new Date(updatedData.dueDate) : existingTask.dueDate,
      })
      .where("id = :id", { id })
      .execute();

    //  Return the updated task
    const updatedTask = await taskRepository.findOneBy({ id });
    if (!updatedTask) {
      throw new Error("Failed to retrieve updated task");
    }

    return updatedTask;
  },

  delete: async function (id: number): Promise<boolean> {
    const taskRepository = AppDataSource.getRepository(Task);

    // Check if the task exists
    const existingTask = await taskRepository.findOneBy({ id });
    if (!existingTask) {
      throw new Error("Task not found");
    }

    //  Perform deletion
    const deleteResult = await taskRepository
      .createQueryBuilder()
      .delete()
      .from(Task)
      .where("id = :id", { id })
      .execute();

    return deleteResult.affected ? true : false; //  Returns true if deleted
  },

  findById: async function (id: number): Promise<TaskType> {
    const taskRepository = AppDataSource.getRepository(Task);
  
    //  Fetch the task by ID
    const task = await taskRepository
      .createQueryBuilder("task")
      .where("task.id = :id", { id })
      .getOne();
  
    if (!task) {
      throw new Error("Task not found"); //  Throws error instead of returning null
    }
  
    return task;
  },
  findByTitle: async function (title: string): Promise<TaskType | null> {
    const taskRepository = AppDataSource.getRepository(Task);
  
    // Fetch the task by title
    const task = await taskRepository
      .createQueryBuilder("task")
      .where("task.title = :title", { title })
      .getOne();
  
    return task || null; // ✅ Return null instead of throwing an error
  }
  
  
  
};
