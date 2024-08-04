import { Todo, User } from "../@types";
import { getCouchbaseConnection } from "../db";
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

  let id: number = 0;
  const userMaxId = getUserTodoIdMax(user);
  const deletedUserMaxId = await getDeletedUserMaxId(userId);

  if (userMaxId > deletedUserMaxId) {
    id = userMaxId;
  } else if (deletedUserMaxId > userMaxId) {
    id = deletedUserMaxId;
  }

  const todo: Todo = {
    id: id + 1,
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
    todo,
  };
};

const deleteTodo = async (userId: string, todoId: number) => {
  let deletedUser: any;

  const user: User = await UserService.getById(userId);

  if (!user) throw new Error("user not found");

  const todo = user.todos?.find((element) => {
    if (element.id === todoId) {
      return element;
    }
  });

  if (!todo) throw new Error("todo not exists");

  const index = user.todos?.indexOf(todo, 0) as number;
  if (index > -1) {
    user.todos?.splice(index, 1);
  }

  await UserService.updateUser(user);

  const { deletedTodos, cluster } = await getCouchbaseConnection();

  const queryResult = await cluster.query(
    "SELECT todos FROM `todo-bucket`.`_default`.`deletedTodo` where id= $userId;",
    {
      parameters: {
        userId,
      },
    }
  );

  let array: any = queryResult.rows.map((element) => element.todos);

  deletedUser = {
    ...user,
    todos: array.reduce(
      (acc: Todo[], current: Todo) => acc.concat(current),
      []
    ),
  };

  deletedUser.todos.push(todo);

  delete deletedUser.password;

  const result = await deletedTodos.upsert(deletedUser.id, deletedUser);

  return {
    cas: result.cas,
    data: deletedUser,
  };
};

const getTodo = async (userId: string, todoId: number) => {
  const user: User = await UserService.getById(userId);
  let todo: any;

  if (user.todos?.length === 0) throw new Error("Todo not found");

  user.todos?.map((element) => {
    if (element.id === todoId) {
      todo = element;
      return;
    }
  });

  return todo as Todo;
};

const getAll = async (userId: string) => {
  const user: User = await UserService.getById(userId);

  if (user.todos?.length === 0) throw new Error("Todo not found");

  return {
    todos: user.todos,
  };
};

const getDeletedTodos = async (userId: string) => {
  const { deletedTodos } = await getCouchbaseConnection();

  const content = (await deletedTodos.get(userId)).content;

  if (!content) throw new Error("document is missing");

  const todos = content.todos;

  return todos;
};

const getUserTodoIdMax = (user: User) => {
  const todo = user.todos as Todo[];

  let maxId = 0;

  if (todo.length === 0) return 0;

  todo.map((todo) => {
    if (todo.id > maxId) {
      maxId = todo.id;
    }
  });

  return maxId;
};

const getDeletedUserMaxId = async (userId: string) => {
  const { cluster } = await getCouchbaseConnection();
  let maxId = 0;
  const queryResult = await cluster.query(
    "SELECT todos FROM `todo-bucket`.`_default`.`deletedTodo` where id= $userId;",
    {
      parameters: {
        userId,
      },
    }
  );

  if (queryResult.rows.length === 0) return 0;

  let todos = queryResult.rows.map((element) => element.todos)[0];

  todos.map((todo: Todo) => {
    if (todo.id > maxId) maxId = todo.id;
  });

  return maxId;
};

const TodoService = {
  createTodo,
  deleteTodo,
  getTodo,
  getAll,
  getDeletedTodos,
};

export default TodoService;
