import { Injectable } from '@angular/core';
import { StrapiService } from "../core/strapi.service";
import { Application, ApplicationWithRelations } from "../strapi-model/application";
import { createRelation } from "../core/strapi-relations";
import { Observable } from "rxjs";

const ENDPOINT = "applications"

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  constructor(private strapi: StrapiService) { }

  add(application: Application): Observable<ApplicationWithRelations> {
    return this.strapi.post<ApplicationWithRelations>(
      ENDPOINT,
      {
        approved: application.approved,
        event: createRelation("connect", [application.eventId]),
        userId: createRelation("connect", [application.userId]),
        submitDate: application.submitDate,
      })
  }

  approve(applicationId: number){
    return this.strapi.put(
      ENDPOINT,
      {approved: true},
      applicationId
    );
  }

  getUserApplications(userId: string): Observable<Application[]> {
    return this.strapi.getMany<Application>(ENDPOINT, { populate: "*" })
  }

  getApplicationsForUserId(id: string) : Observable<Application[]> {
    return this.strapi.getMany<Application>("applications",
      {
        "filters[user][id][$eq]": id,
        populate: "*" })
  }
}

