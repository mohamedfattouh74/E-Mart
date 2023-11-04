export interface User {
  email?: string | null | undefined;
  password?: string | null | undefined;
}

export interface authStateModel {
  user: User;
  isLogged: boolean;
  error: string;
}
