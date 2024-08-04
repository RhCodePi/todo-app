import { Router } from "express";
import { createTodo, deleteTodo, getTodo } from "../controllers/todo.controller";

const todoRouter = Router()

todoRouter.post("/", createTodo)
todoRouter.delete("/:id", deleteTodo)
todoRouter.get("/:id", getTodo)

export default todoRouter;