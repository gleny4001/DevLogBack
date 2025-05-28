// src/routes/log.routes.ts
import { Router } from "express";
import { createLog, getLogs } from "../controllers/log.controllers";

const router = Router();

router.post("/log", createLog);
router.get("/logs", getLogs);

export default router;
