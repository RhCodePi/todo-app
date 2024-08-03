import { Response, Request, NextFunction } from "express";
import { SafeUser, User } from "../@types";
import jwt from "jsonwebtoken";

export const validToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const headerAuthField = req.headers.authorization;

    if (!headerAuthField) {
      throw new Error("unauthorized");
    }

    const accessToken = headerAuthField.split(" ")[1];

    const user = verifyAccessToken(accessToken);

    req.headers["id"] = user.id;

    next();
  } catch (error) {
    if (error instanceof Error) {
      res.status(401).json({
        success: false,
        message: error.message,
      });
    }
  }
};

const verifyAccessToken = (token: string) =>
  jwt.verify(token, process.env.SECRET_KEY) as SafeUser;