// src/app.ts
import express from "express";
import cors from "cors";
import logRoutes from "./src/routes/log.routes";
import projectRoutes from "./src/routes/project.routes";
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", logRoutes);
app.use("/api", projectRoutes);
export default app;
