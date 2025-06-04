import { Request, Response, NextFunction } from "express";
import admin from "../firebase/firebaseAdmin";

export const authenticateFirebase = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const token = req.headers.authorization?.split("Bearer ")[1];

    if (!token) {
        res.status(401).json({ message: "Missing token" });
        return;
    }

    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        const { uid, email, name } = decodedToken;

        if (!uid || !email) {
            res.status(401).json({ message: "Invalid token payload" });
            return;
        }

        // Attach to request
        req.user = { uid, email, name };
        next();
    } catch (err) {
        res.status(401).json({ message: "Invalid or expired token" });
    }
};
