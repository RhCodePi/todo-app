import { Response, Request, NextFunction } from "express";
import * as dotenv from "dotenv";
import { validateFieldsForRequest } from "../helpers/utils";
import { Todo } from "../@types";
import TodoService from "../services/todo.service";
import APIError from "../errros/api.error";

dotenv.config();

export const createTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.headers.host !== process.env.HOST_SERVICE) {
      throw new APIError(500, "INTERNAL_SERVER_ERROR", "server not found");
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
    next(error);
  }
};

export const deleteTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.headers.host !== process.env.HOST_SERVICE) {
      throw new APIError(500, "INTERNAL_SERVER_ERROR", "server not found");
    }
    const userId = req.headers["id"] as string;

    const todoId = parseInt(req.params.id.slice(1));

    const result = await TodoService.deleteTodo(userId, todoId);

    res.status(200).json({
      success: true,
      data: result.data,
    });
  } catch (error) {
    next(error);
  }
};

export const getTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.headers.host !== process.env.HOST_SERVICE) {
      throw new APIError(500, "INTERNAL_SERVER_ERROR", "server not found");
    }
    const userId = req.headers["id"] as string;

    const todoId = parseInt(req.params.id.slice(1));

    const result = await TodoService.getTodo(userId, todoId);

    res.status(200).json({
      succees: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const getAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.headers.host !== process.env.HOST_SERVICE) {
      throw new APIError(500, "INTERNAL_SERVER_ERROR", "server not found");
    }
    const userId = req.headers["id"] as string;

    const result = await TodoService.getAll(userId);

    res.status(200).json({
      success: true,
      data: result.todos,
    });
  } catch (error) {
    next(error);
  }
};

export const getDeletedTodos = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.headers.host !== process.env.HOST_SERVICE) {
      throw new APIError(500, "INTERNAL_SERVER_ERROR", "server not found");
    }
    const userId = req.headers["id"] as string;

    const result = await TodoService.getDeletedTodos(userId);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
