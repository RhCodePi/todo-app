import { User } from "../@types";
import { getCouchbaseConnection } from "../db";

const getById = async (id: string) => {
  const { users } = await getCouchbaseConnection()

  const user = await users.get(id)

  return user.content
};

const updateUser = async (user: User) => {
    const {users} = await getCouchbaseConnection()

    const updatedUser = await users.upsert(user.id, user)

    return updatedUser.cas
}

const UserService = {
    getById,
    updateUser
}

export default UserService