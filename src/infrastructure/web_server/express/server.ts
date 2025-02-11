import "reflect-metadata";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { AppDataSource } from "../../orm/typeorm/config/ormconfig"; // Adjust path to ORM config
import { taskRouter } from "../../../interface/routes/TaskRoute";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../../../../swagger/swagger.json";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));



app.use("/todo",taskRouter)

app.get("/", (req, res) => {
  res.send("Server is running...");
});

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected successfully");

    app.listen(3000, () => {
      console.log("Server running on http://localhost:3000, API Docs: http://localhost:3000/api-docs");
    });
  })
  .catch((error) => console.log("Database connection error:", error));
