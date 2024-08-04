import { Router } from "express";
import { createTodo, deleteTodo, getAll, getDeletedTodos, getTodo } from "../controllers/todo.controller";

const todoRouter = Router()

todoRouter.post("/", createTodo)
todoRouter.delete("/:id", deleteTodo)
todoRouter.get("/get/:id", getTodo)
todoRouter.get("/getAll/", getAll)
todoRouter.post("/deleted", getDeletedTodos)

export default todoRouter;