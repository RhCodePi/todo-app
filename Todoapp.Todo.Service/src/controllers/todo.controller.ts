import { Response, Request, NextFunction } from "express";
import * as dotenv from "dotenv";

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
    



  } catch (error) {}
};
