import { User } from "../@types";
import { getCouchbaseConnection } from "../db";
import APIError from "../errors/api.error";
import { hashPassword, verifyPassword } from "../helpers/utils";
import TokenService from "./token.service";
import UserService from "./user.service";

const register = async (user: User) => {
  const { users } = await getCouchbaseConnection();

  const isEmailExists = await users.exists(user.email);

  if (isEmailExists.exists)
    throw new APIError(400, "EMAIL_INVALID", "email already exists");

  const hashedPassword = await hashPassword(user.password);

  const updatedUser = {
    ...user,
    password: hashedPassword,
  };

  const result = await users.insert(user.id, updatedUser);

  return result.cas;
};

const login = async (credentials: Pick<User, "email" | "password">) => {
  const user = await UserService.getByEmail(credentials.email);

  if (!(await verifyPassword(credentials.password, user.password)))
    throw new APIError(400, "CREDENTIALS_INVALID", "Credentials are wrong");

  delete user.password;

  const accessToken = TokenService.createAccessToken(user);
  const refreshToken = TokenService.createRefreshToken({ id: user.id });

  return {
    user,
    accessToken,
    refreshToken,
  };
};

const refreshToken = async (refreshToken: string) => {
  const verifyRefreshToken = TokenService.verifyRefreshToken(refreshToken);

  const user = await UserService.getById(verifyRefreshToken.id);

  delete user.passowrd;

  const accessToken = TokenService.createAccessToken(user);

  return {
    user,
    accessToken,
  };
};

const AuthService = {
  register,
  login,
  refreshToken,
};

export default AuthService;
