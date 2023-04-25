import { StrapiRelations } from "../core/strapi-relations";

export interface Application {
  approved: boolean;
  eventId: number;
  userId: number;
  submitDate: Date;
}

export interface ApplicationWithRelations {
  approved: boolean;
  event: StrapiRelations;
  userId: StrapiRelations;
  submitDate: Date;
}

