import { User } from "../@types";
import { getCouchbaseConnection } from "../db";
import { hashPassword } from "../helpers/utils";

const register = async (user: User) => {
  const { users } = await getCouchbaseConnection();

  const isEmailExists = await users.exists(user.email);

  if (isEmailExists.exists) {
    throw new Error("email already exists");
  }

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
    throw new Error("Credentials are wrong");

  delete user.password;

  const accessToken = TokenService.createAccessToken(user);
  const refreshToken = TokenService.createRefreshToken({ id: user.id });

  return {
    user,
    accessToken,
    refreshToken,
  };
};

const AuthService = {
    register
}

export default AuthService

