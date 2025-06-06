import { Request, Response } from "express";
import { prisma } from "../prisma/client";

export const createProject = async (req: Request, res: Response) => {
    try {
        const { name } = req.body;
        const { uid: firebaseUid, email, name: displayName } = req.user;

        // Check if user exists in DB, otherwise create
        let user = await prisma.user.findUnique({
            where: { firebaseUid },
        });

        if (!user) {
            user = await prisma.user.create({
                data: {
                    firebaseUid,
                    email,
                    name: displayName ?? undefined,
                },
            });
        }

        const project = await prisma.project.create({
            data: {
                userId: user.id,
                name,
            },
        });

        res.status(201).json(project);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to create project" });
    }
};

export const getProjectByID = async (req: Request, res: Response) => {
    try {
        const firebaseUid = req.user?.uid;
        const projectId = req.params.projectId;

        if (!projectId) {
            res.status(400).json({ error: "Project ID is required" });
        }

        const user = await prisma.user.findUnique({
            where: { firebaseUid },
        });

        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }

        const project = await prisma.project.findFirst({
            where: { userId: user.id, id: projectId },
            include: {
                log: {
                    orderBy: {
                        createdAt: "desc",
                    },
                    include: {
                        todo: true,
                    },
                },
            },
        });

        if (!project) {
            res.status(404).json({ error: "Project not found" });
        }

        res.json(project);
    } catch (err) {
        res.status(500).json({ error: "Failed get project" });
    }
};

export const getProjects = async (req: Request, res: Response) => {
    try {
        const firebaseUid = req.user?.uid;

        const user = await prisma.user.findUnique({
            where: { firebaseUid },
        });

        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }

        const projects = await prisma.project.findMany({
            where: { userId: user.id },
            orderBy: { createdAt: "desc" },
            include: { log: true },
        });

        res.json(projects);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch projects" });
    }
};
