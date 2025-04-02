import { Router } from "express";
import AuthController from "../controllers/authController";

const router = Router();
const authController = new AuthController();

export const setRoutes = (app: any) => {
    // Attach the router to the app
    app.post("/api/auth/login", (req: import("express").Request, res: import("express").Response) => authController.login(req, res));
    app.post("/api/auth/register", (req: import("express").Request, res: import("express").Response) => authController.register(req, res));
    return router;
};


