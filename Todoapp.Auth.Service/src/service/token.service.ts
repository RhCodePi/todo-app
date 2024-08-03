import jwt from "jsonwebtoken";
import { SafeUser } from "../@types";

const createAccessToken = (payload: SafeUser) =>
  jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: process.env.EXPIRES_IN,
  });

const verifyAccessToken = (token: string) =>
  jwt.verify(token, process.env.SECRET_KEY) as SafeUser;

const createRefreshToken = (payload: Pick<SafeUser, "id">) =>
  jwt.sign(payload, process.env.REFRESH_TOKEN_KEY);

const verifyRefreshToken = (token: string) =>
  jwt.verify(token, process.env.REFRESH_TOKEN_KEY) as Pick<SafeUser, "id">;

const TokenService = {
  createAccessToken,
  verifyAccessToken,
  createRefreshToken,
  verifyRefreshToken,
};

export default TokenService;
