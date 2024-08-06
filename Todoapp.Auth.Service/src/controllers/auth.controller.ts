import { Request, Response, NextFunction } from "express";
import { User } from "../@types";
import { validateFieldsForRequest } from "../helpers/utils";

import * as dotenv from "dotenv";
import AuthService from "../service/auth.service";
dotenv.config();

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
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
