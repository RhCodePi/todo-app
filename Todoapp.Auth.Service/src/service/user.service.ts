import { Express } from "express";
import { getCouchbaseConnection } from "../db";
import APIError from "../errors/api.error";

const getByEmail = async (email: string) => {
  const { cluster } = await getCouchbaseConnection();

  const queryResult = await cluster.query(
    "SELECT id, name, lastname, `password` FROM `todo-bucket`.`_default`.`users` where email = $email",
    {
      parameters: {
        email,
      },
    }
  );

  if (queryResult.rows.length === 0)
    throw new APIError(404, "NOT_FOUND", "user not exsist");

  return queryResult.rows[0];
};

const getById = async (id: string) => {
  const { users } = await getCouchbaseConnection();

  const user = await users.get(id);

  return user.content;
};

const UserService = {
  getByEmail,
  getById,
};

export default UserService;
