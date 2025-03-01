import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { Task } from "../entities/TaskEntity";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST || "mysql",
  port: Number(process.env.DB_PORT) || 3306, 
  username: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "preet",
  database: process.env.DB_NAME || "todo_db",
  synchronize: false,
  logging: false,
  entities: [Task],
});
