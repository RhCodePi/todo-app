import { User } from "../@types";
import { getCouchbaseConnection } from "../db";
import { hashPassword } from "../helpers/utils";

const register = async (user: User) => {

    const connection = await getCouchbaseConnection()

    const hashedPassword = hashPassword(user.password)

    const updatedUser = {
        ...user, password: hashedPassword
    }

    const result = await connection.users.insert(user.id, updatedUser)

    return result.cas
}


const AuthService = {
    register
}

export default AuthService

