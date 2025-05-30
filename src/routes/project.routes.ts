import { Router } from "express";
import { createProject, getProjects } from "../controllers/project.controllers";

const router = Router();

router.post("/project", createProject);
router.get("/projects", getProjects);

export default router;
