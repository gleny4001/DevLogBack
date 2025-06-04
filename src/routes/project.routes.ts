import { Router } from "express";
import { createProject, getProjects } from "../controllers/project.controllers";
import { authenticateFirebase } from "../middleware/authenticateFirebase";

const router = Router();

// 👇 Only logged-in users can create or fetch projects
router.post("/project", authenticateFirebase, createProject);
router.get("/projects", authenticateFirebase, getProjects);

export default router;
