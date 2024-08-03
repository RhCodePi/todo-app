import { Router } from "express";
import { createTodo } from "../controllers/todo.controller";

const todoRouter = Router()

todoRouter.post("/", createTodo)

export default todoRouter;