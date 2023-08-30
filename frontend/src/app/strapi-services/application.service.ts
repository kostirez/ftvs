import { Injectable } from '@angular/core';
import { StrapiService } from "../core/strapi.service";
import { Application, ApplicationWithRelations } from "../strapi-model/application";
import { createRelation } from "../core/strapi-relations";
import { Observable } from "rxjs";
import { userApplicationCard } from "../page-components/user/user.component";
import { map } from "rxjs/operators";
import { Event } from "../strapi-model/event";

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
        user: createRelation("connect", [application.userId]),
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

  getUserApplications(userId: number): Observable<Application[]> {
    return this.strapi.getMany<Application>(ENDPOINT, { populate: "*" })
  }

  getApplicationCardsForUserId(id: number) : Observable<userApplicationCard[]> {
    return this.strapi.getMany<Application & {event: Event}>("applications",
      {
        "filters[user][id][$eq]": id,
        populate: "event" }).pipe(
          map(a => a.map(item => ({
            name: item.event.name,
            start: item.event.startDate,
            end: item.event.endDate,
            paid: item.approved,
            price: item.event.price,
            submitDate: item.submitDate,
            id: item.eventId,
          }))
          )
    )
  }
}

