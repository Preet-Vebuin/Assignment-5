import { DataSource } from "typeorm";
import dotenv from "dotenv";

dotenv.config(); 

export const dbConnection = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST || "mysql", //Docker service name
  port: Number(process.env.DB_PORT) || 3306, // actual MySQL port
  username: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "preet",
  database: process.env.DB_NAME || "todo_db", 
  synchronize: false, 
  dropSchema: false, 
  entities: [__dirname + "/../domain/*.ts"], 
});

/**
 * Establish connection with real MySQL database inside Docker
 */
async function connectWithRetry(attempts = 5) {
  for (let i = 0; i < attempts; i++) {
    try {
      await dbConnection.initialize();
      console.log("✅ Connected to Docker MySQL database");
      return;
    } catch (error) {
      console.error(`DB connection attempt ${i + 1} failed:`, error);
      await new Promise((res) => setTimeout(res, 3000)); // Wait before retrying
    }
  }
  throw new Error("Could not establish connection with Docker MySQL");
}

// Jest global setup
beforeAll(async () => {
  try {
    console.log("Running init.sql for Jest testing...");
    
    await dbConnection.initialize();
    console.log("Test database initialized successfully");
  } catch (error) {
    console.error("Error initializing test database:", error);
  }
});

// Jest cleanup
afterAll(async () => {
  if (dbConnection.isInitialized) {
    await dbConnection.destroy();
    console.log("MySQL connection closed");
  }
});
