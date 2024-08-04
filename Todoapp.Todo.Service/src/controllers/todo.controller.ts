import { Response, Request, NextFunction } from "express";
import * as dotenv from "dotenv";
import { validateFieldsForRequest } from "../helpers/utils";
import { Todo } from "../@types";
import TodoService from "../services/todo.service";
import { DocumentExistsError, DocumentNotFoundError } from "couchbase";

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
    } else if (error instanceof DocumentExistsError) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    } else if (error instanceof DocumentNotFoundError) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
};

export const deleteTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.headers["id"] as string;

    const todoId = parseInt(req.params.id.slice(1));

    const result = await TodoService.deleteTodo(userId, todoId);

    res.status(200).json({
      success: true,
      data: result.data,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    } else if (error instanceof DocumentExistsError) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    } else if (error instanceof DocumentNotFoundError) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
};

export const getTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.headers["id"] as string;

    const todoId = parseInt(req.params.id.slice(1));

    const result = await TodoService.getTodo(userId, todoId);

    res.status(200).json({
      succees: true,
      data: result,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    } else if (error instanceof DocumentExistsError) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    } else if (error instanceof DocumentNotFoundError) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
};
