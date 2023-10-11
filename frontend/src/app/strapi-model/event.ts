import { StrapiRelations } from "../core/strapi-relations";
import { Img } from "./img";

export interface Event {
  id: number;
  name: string;
  description: string;
  img: Img;
  applications: number[];
  organizers: number[];
  price: string;
  startDate: Date;
  endDate: Date;
  category: string;
}

export interface EventWithRelations {
  name: string;
  description: string;
  imgs: Img;
  applications: StrapiRelations;
  organizers: StrapiRelations;
}
