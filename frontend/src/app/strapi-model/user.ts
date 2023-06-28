export interface User {
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: Date;
  updatedAt: Date;
  id: string;
}

export interface AuthUser {
  jwt: string;
  user: User;
}
