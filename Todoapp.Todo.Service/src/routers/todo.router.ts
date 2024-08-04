import { Router } from "express";
import { createTodo, deleteTodo } from "../controllers/todo.controller";

const todoRouter = Router()

todoRouter.post("/", createTodo)
todoRouter.delete("/:id", deleteTodo)

export default todoRouter;