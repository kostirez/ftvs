import { StrapiRelations } from "../core/strapi-relations";

export interface Application {
  id?: number;
  approved: boolean;
  eventId: number;
  userId?: number;
  submitDate: Date;
  guestName?: string,
  guestEmail?: string,
}

export interface ApplicationWithRelations {
  approved: boolean;
  event: StrapiRelations;
  user?: StrapiRelations;
  guestName?: string,
  guestEmail?: string,
  submitDate: Date;
}

