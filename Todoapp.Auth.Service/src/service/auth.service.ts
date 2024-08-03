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

const AuthService = {
    register
}

export default AuthService

