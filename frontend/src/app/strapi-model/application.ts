import { StrapiRelations } from "../core/strapi-relations";

export interface Application {
  id?: number;
  approved: boolean;
  eventId: number;
  userId: number;
  submitDate: Date;
}

export interface ApplicationWithRelations {
  approved: boolean;
  event: StrapiRelations;
  user: StrapiRelations;
  submitDate: Date;
}

