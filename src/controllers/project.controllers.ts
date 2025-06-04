import { Request, Response } from "express";
import { prisma } from "../prisma/client";

export const createProject = async (req: Request, res: Response) => {
    try {
        const { name } = req.body;
        const firebaseUid = req.user.uid;
        const email = req.user.email;
        const displayName = req.user.name;

        if (!firebaseUid || !email) {
            res.status(400).json({ error: "Missing user info" });
        }

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

export const getProjects = async (req: Request, res: Response) => {
    try {
        const firebaseUid = req.user?.uid;

        if (!firebaseUid) {
            res.status(401).json({ error: "Unauthorized" });
        }

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
