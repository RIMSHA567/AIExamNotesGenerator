import express from "express";
import { googleAuth } from "../controllers/auth.controller.js";
import { logout } from "../controllers/auth.controller.js";

const authRouter = express.Router();

// Google authentication route
// 5*
authRouter.post("/google", googleAuth);
authRouter.get("/logout", logout);

export default authRouter;
