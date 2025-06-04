// controllers/user.controller.ts
import { Request, Response } from "express";
import { prisma } from "../prisma/client";

// Extend Express Request interface to include 'user'
declare global {
    namespace Express {
        interface Request {
            user: {
                uid: string;
                email: string;
                name?: string;
            };
        }
    }
}

export const getOrCreateUserProfile = async (req: Request, res: Response) => {
    const { uid, email, name } = req.user as {
        uid: string;
        email: string;
        name?: string;
    };

    try {
        let user = await prisma.user.findUnique({
            where: { firebaseUid: uid },
        });

        if (!user) {
            user = await prisma.user.create({
                data: {
                    firebaseUid: uid,
                    email,
                    name: name || "",
                },
            });
        }

        res.json({ user });
    } catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(500).json({ message: "Failed to fetch user profile." });
    }
};
