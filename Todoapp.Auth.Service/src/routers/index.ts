import { Router } from "express";
import authRouter from "./auth.router";
import { hostMiddleware } from "../middlewares/host.middleware";

const router = Router();

router.use("/auth", hostMiddleware, authRouter)

export default router;
