import express from "express";
import dotenv from "dotenv";
import registerBackendRouter from "./Routes/RegisterRoute.js";
import { connectToDatabase } from "./Config/Database.js";
import loginBackendRouter from "./Routes/LoginRoute.js";
import tasksBackendRouter from "./Routes/TasksRoute.js";
import cors from "cors";
import userBackendRouter from "./Routes/UserRoute.js";

dotenv.config();
const app = express();
connectToDatabase();
app.use(express.json());
app.use(cors());

app.use("/backend/node/v2/api/user", registerBackendRouter);
app.use("/backend/node/v2/api/user", loginBackendRouter);
app.use("/backend/node/v2/api/tasks", tasksBackendRouter);
app.use("/backend/node/v2/api/get", userBackendRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`${`Server is running currently at port ${PORT} `}`);
});
