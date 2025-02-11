import { DataSource } from "typeorm";
import dotenv from "dotenv";
import path from "path"
import { Task } from "../entities/TaskEntity";

dotenv.config();


export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "preet",
  database: process.env.DB_NAME || "ORM",
  synchronize: false,
  logging: false,
  entities: [Task],
});
