import { Injectable } from '@angular/core';
import { Observable, of } from "rxjs";
import { Event } from "../strapi-model/event";
import { StrapiService } from "../core/strapi.service";
import { Application } from "../strapi-model/application";
import { AuthService } from "./auth.service";

const ENDPOINT = "events"

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private strapi: StrapiService,
              private authService: AuthService) { }

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

  getMyEvents(): Observable<Event[]> {
    if (this.authService.userId) {
      return this.strapi.getMany<Event>("events",
        {
          "filters[organizers][id][$eq]": this.authService.userId,
          populate: [] });
    }
    return of([]);
  }



}
