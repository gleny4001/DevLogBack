// src/routes/log.routes.ts
import { Router } from "express";
import { createLog, getLogs } from "../controllers/log.controllers";
import { authenticateFirebase } from "../middleware/authenticateFirebase";

const router = Router();

router.post("/log", authenticateFirebase, createLog);
router.get("/logs/:projectId", authenticateFirebase, getLogs);

export default router;
