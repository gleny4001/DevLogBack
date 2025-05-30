import { Request, Response } from "express";
import { prisma } from "../prisma/client";

export const createProject = async (req: Request, res: Response) => {
    try {
        const { name } = req.body;
        const project = await prisma.project.create({
            data: { name },
        });
        res.status(201).json(project);
    } catch (err) {
        res.status(500).json({ error: "Failed to create project" });
    }
};

export const getProjects = async (_req: Request, res: Response) => {
    try {
        const projects = await prisma.project.findMany({
            orderBy: { createdAt: "desc" },
            include: {
                log: true,
            },
        });
        res.json(projects);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch projects" });
    }
};
