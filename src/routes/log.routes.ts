// src/routes/log.routes.ts
import { Router } from "express";
import { createLog } from "../controllers/log.controllers";
import { authenticateFirebase } from "../middleware/authenticateFirebase";

const router = Router();

router.post("/log", authenticateFirebase, createLog);

export default router;
