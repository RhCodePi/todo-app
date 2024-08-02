export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  lastname: string;
  todos?: Todo[];
}

export interface Todo {
  id: number;
  text: string;
  author: string;
  isCompleted: boolean;
  expireDate: Date;
  createdAt: Date;
  updatedAt: Date;
}