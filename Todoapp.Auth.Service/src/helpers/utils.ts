import { Request, Response } from "express";
import bcrypt from "bcrypt";
import BaseError from "../errors/base.error";
import APIError from "../errors/api.error";
import { DocumentExistsError, DocumentNotFoundError } from "couchbase";
import { JsonWebTokenError } from "jsonwebtoken";

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
      "MISSING_FIELDS_FOUND",
      `fields are missing: ${missingFields.join(", ")}`
    );

  validateFields.map((element) => {
    object[element] = req.body[element];
  });

  return object as T;
};

export const hashPassword = async (passowrd: string) => {
  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(passowrd, salt);

  return hash;
};

export const verifyPassword = async (passowrd: string, encrypted: string) =>
  await bcrypt.compare(passowrd, encrypted);

export const isTrustedError = (err: Error) => {
  if (err instanceof BaseError) return err.isOperational;
  return false;
};

export const filterError = (err: Error) => {
  if (isTrustedError(err) && err instanceof BaseError) return err;
  else if (err instanceof DocumentNotFoundError) {
    // @ts-ignore
    const id = err.cause.id;
    return new APIError(404, "DOCUMENT_NOT_FOUND", `No document found ${id}`);
  } else if (err instanceof DocumentExistsError) {
    // @ts-ignore
    const id = err.cause.id;
    return new APIError(400, "DOCUMENT_EXSIST", `Document exsist ${id}`);
  } else if (err instanceof JsonWebTokenError) {
    return new APIError(400, "JWT_MALFORMED", "invalid token");
  }

  return new APIError(500, "INTERNAL_SERVER_ERROR", "something went wrong");
};
