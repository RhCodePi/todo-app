import { Request, Response, NextFunction } from "express";
import { User } from "../@types";
import { validateFieldsForRequest } from "../helpers/utils";

import * as dotenv from "dotenv";
import AuthService from "../service/auth.service";
import APIError from "../errors/api.error";
dotenv.config();

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.headers.host !== process.env.HOST_SERVICE) {
      return new APIError(
        500,
        "INTERNAL_SERVER_ERROR",
        "host server does not exsist"
      );
    }

    const requiredFields = ["id", "email", "password", "name", "lastname"];

    const validatedFields = validateFieldsForRequest<User>(
      req,
      requiredFields
    ) as User;

    const createdUser = await AuthService.register(validatedFields);

    res.status(201).json({
      success: true,
      data: {
        createdUser,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const signIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.headers.host !== process.env.HOST_SERVICE) {
      return new APIError(
        500,
        "INTERNAL_SERVER_ERROR",
        "host server does not exsist"
      );
    }

    const requiredFields = ["email", "password"];

    const validatedFields = validateFieldsForRequest<
      Pick<User, "email" | "password">
    >(req, requiredFields);

    const result = await AuthService.login(validatedFields);

    req.headers.authorization = result.accessToken;

    res.status(200).json({
      success: true,
      data: result.user,
      accessToken: result.accessToken,
      refreshToken: result.refreshToken,
    });
  } catch (error) {
    next(error);
  }
};

export const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.headers.host !== process.env.HOST_SERVICE) {
      return new APIError(
        500,
        "INTERNAL_SERVER_ERROR",
        "host server does not exsist"
      );
    }
    const refreshToken = ["refreshToken"];

    const validatedFields = validateFieldsForRequest<{ refreshToken: string }>(
      req,
      refreshToken
    );

    const result = await AuthService.refreshToken(validatedFields.refreshToken);

    res.status(200).json({
      success: true,
      data: result.accessToken,
    });
  } catch (error) {
    next(error);
  }
};
