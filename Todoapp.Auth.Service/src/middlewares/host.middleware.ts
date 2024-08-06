import { Request, Response, NextFunction } from "express";
import APIError from "../errors/api.error";

export const hostMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.headers.host !== process.env.HOST_SERVICE) {
      throw new APIError(500, "INTERNAL_SERVER_ERROR", "server not found");
    }
    next();
  } catch (error) {
    next(error);
  }
};
