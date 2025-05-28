// src/controllers/log.controller.ts
import { Request, Response } from "express";
import { prisma } from "../prisma/client";

export const createLog = async (req: Request, res: Response) => {
    try {
        const { title, whatIDid, whatsNext, bug, score } = req.body;
        const log = await prisma.log.create({
            data: { title, whatIDid, whatsNext, bug, score },
        });
        res.status(201).json(log);
    } catch (err) {
        res.status(500).json({ error: "Failed to create log" });
    }
};

export const getLogs = async (_req: Request, res: Response) => {
    try {
        const logs = await prisma.log.findMany({
            orderBy: { createdAt: "desc" },
        });
        res.json(logs);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch logs" });
    }
};
