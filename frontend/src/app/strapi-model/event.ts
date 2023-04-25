import { StrapiRelations } from "../core/strapi-relations";

export interface Event {
  name: string;
  description: string;
  imgs: {}[];
  applications: number[];
  organizers: number[];
}

export interface EventWithRelations {
  name: string;
  description: string;
  imgs: {}[];
  applications: StrapiRelations;
  organizers: StrapiRelations;
}
