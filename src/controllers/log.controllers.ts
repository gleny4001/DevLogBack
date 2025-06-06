import { Request, Response } from "express";
import { prisma } from "../prisma/client";
import { createTodoFromLog } from "../services/openaiTodo";

export const createLog = async (req: Request, res: Response) => {
    try {
        const { whatIDid, whatsNext, bug, projectId } = req.body;

        const log = await prisma.log.create({
            data: {
                whatIDid,
                whatsNext,
                bug,

                project: { connect: { id: projectId } },
            },
        });

        const todos = await createTodoFromLog(log);

        const todo = await prisma.todo.create({
            data: {
                todos,
                logId: log.id,
            },
        });
        res.status(201).json({ log, todo });
    } catch (err) {
        res.status(500).json({ error: "Failed to create log" + err });
    }
};
