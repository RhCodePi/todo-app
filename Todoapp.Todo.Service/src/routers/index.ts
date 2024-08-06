import { Router } from "express";
import todoRouter from "./todo.router";
import { hostMiddleware } from "../middlewares/host.middleware";

const router = Router();

router.use("/todo", hostMiddleware, todoRouter)

export default router;
