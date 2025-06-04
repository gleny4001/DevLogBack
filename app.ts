// src/app.ts
import express from "express";
import cors from "cors";
import logRoutes from "./src/routes/log.routes";
import projectRoutes from "./src/routes/project.routes";
import userRoutes from "./src/routes/user.routes";

const app = express();
app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    })
);
app.use(express.json());

app.use("/api", logRoutes);
app.use("/api", projectRoutes);
app.use("/api", userRoutes);

export default app;
