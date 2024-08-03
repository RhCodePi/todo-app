import { Request, Response, NextFunction } from "express";
import { User } from "../@types";
import { validateFieldsForRequest } from "../helpers/utils";

import * as dotenv from "dotenv";
import AuthService from "../service/auth.service";
import { DocumentExistsError, DocumentNotFoundError } from "couchbase";
dotenv.config();

export const signUp = async (
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
    if (error instanceof Error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    } else if (error instanceof DocumentExistsError) {
      res.status(400).json({
        success: false,
        message: "document already exists",
      });
    }
  }
};

export const signIn = async (
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

    const requiredFields = ["email", "password"];

    const validatedFields = validateFieldsForRequest<
      Pick<User, "email" | "password">
    >(req, requiredFields);

    const result = await AuthService.login(validatedFields);

    req.headers.authorization = result.accessToken;
    req.headers = {
      ...req.headers,
      id: result.user.id,
    };

    res.status(200).json({
      success: true,
      data: result.user,
      accessToken: result.accessToken,
      refreshToken: result.refreshToken,
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

export const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};
