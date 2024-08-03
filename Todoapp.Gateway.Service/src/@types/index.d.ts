export interface User {
    id: string;
    email: string;
    password: string;
    name: string;
    lastname: string;
    todos?: Todo[];
  }

export type SafeUser = Omit<User, 'password'>