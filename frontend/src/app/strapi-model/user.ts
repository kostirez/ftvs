import { Img } from "./img";

export interface User {
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: Date;
  updatedAt: Date;
  id: number;
  publicUserId: number;
}

export interface AuthUser {
  jwt: string;
  user: User;
}

export interface PublicUser {
  id: number;
  name: string;
  description: string;
  mail: string;
  avatar: Img;
}
