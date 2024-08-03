import { Response, Request, NextFunction } from "express";
import * as dotenv from "dotenv";
import { validateFieldsForRequest } from "../helpers/utils";
import { Todo } from "../@types";
import TodoService from "../services/todo.service";
import bodyParser = require("body-parser");

dotenv.config();

export const createTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.headers.host !== process.env.HOST_SERVICE) {
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
      return;
    }

    const id = req.headers["id"] as string;

    const requiredFields = ["text", "expireDate"];

    const validatedFields = validateFieldsForRequest<
      Pick<Todo, "text" | "expireDate">
    >(req, requiredFields);

    const result = await TodoService.createTodo(id, validatedFields);

    res.status(201).json({
      success: true,
      data: result.todo,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
};
