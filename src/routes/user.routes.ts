// routes/user.routes.ts
import express from "express";
import { getOrCreateUserProfile } from "../controllers/user.controllers";
import { authenticateFirebase } from "../middleware/authenticateFirebase";

const router = express.Router();

router.get("/profile", authenticateFirebase, getOrCreateUserProfile);

export default router;
