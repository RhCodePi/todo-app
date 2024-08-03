import { Todo, User } from "../@types";
import UserService from "./user.service";

const createTodo = async (
  userId: string,
  validatedFields: Pick<Todo, "text" | "expireDate">
) => {
  let user: User = await UserService.getById(userId);

  if (!user.todos) {
    user = {
      ...user,
      todos: [],
    };
  }

  const todo: Todo = {
    id: (user.todos?.length as number) + 1,
    author: user.name + " " + user.lastname,
    createdAt: new Date(),
    updatedAt: new Date(),
    expireDate: validatedFields.expireDate,
    text: validatedFields.text,
    isCompleted: false,
  };

  user.todos?.push(todo);

  const result = await UserService.updateUser(user);

  return {
    cas: result,
    todo
  };
};

const TodoService = {
  createTodo,
};

export default TodoService;
