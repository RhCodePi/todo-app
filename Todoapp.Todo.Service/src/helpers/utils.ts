import { Request } from "express";
import BaseError from "../errros/base.error";
import APIError from "../errros/api.error";

export const validateFieldsForRequest = <T>(
  req: Request,
  validateFields: string[]
) => {
  const missingFields: string[] = [];
  const object: Record<string, any> = {};

  const keys = Object.keys(req.body);

  for (let index = 0; index < validateFields.length; index++) {
    const field = validateFields[index];

    if (!keys.includes(field)) {
      missingFields.push(field);
    }
  }

  if (missingFields.length > 0)
    throw new APIError(
      400,
      "FIELD_MISSING",
      `fields are missing: ${missingFields.join(", ")}`
    );

  validateFields.map((element) => {
    object[element] = req.body[element];
  });

  return object as T;
};

export const isTrustedError = (err: Error) => {
  if (err instanceof BaseError) return err.isOperational;
  return false;
};

export const filterError = (err: Error) => {
  if (err instanceof BaseError && isTrustedError(err)) return err;

  return new APIError(500, "INTERNAL_SERVER_ERROR", "Something went wrong");
};
