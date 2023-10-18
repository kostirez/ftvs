import { Img } from "./img";
import { Application } from "./application";

export interface User {
  id: number;
  username: string;
  email: string;
  confirmed: boolean;
  blocked: boolean;
  avatar: Img;
  description: string;
  organizer: boolean;
  events: Event[];
  applications: Application[]
}

export interface AuthUser {
  jwt: string;
  user: User;
}

export interface Member {
  name: string;
  title: string;
  picture: Img;
  email: string;
}
