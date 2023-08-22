import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { Event } from "../strapi-model/event";
import { StrapiService } from "../core/strapi.service";
import { Application } from "../strapi-model/application";

const ENDPOINT = "events"

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private strapi: StrapiService) { }

  getOne(id: number): Observable<Event> {
    return this.strapi.getOne<Event>(ENDPOINT, { populate: ["organizers", "applications", "img"] }, id);
  }

  getMany(): Observable<Event[]> {
    return this.strapi.getMany<Event>(ENDPOINT, { populate: "*" })
  }

  getApplicationsForEventId(id: string) : Observable<Application[]> {
    return this.strapi.getMany<Application>("applications",
      {
        "filters[event][id][$eq]": id,
        populate: ['user']})
  }

  getEventsByOrganizer(publicUserId: number): Observable<Event[]> {
    return this.strapi.getMany<Event>("events",
      {
        "filters[organizers][id][$eq]": publicUserId,
        populate: [] });
  }



}
