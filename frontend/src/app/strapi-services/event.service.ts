import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { Event } from "../strapi-model/event";
import { StrapiService } from "../core/strapi.service";

const ENDPOINT = "events"

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private strapi: StrapiService) { }

  getOne(id: number): Observable<Event> {
    return this.strapi.getOne<Event>(ENDPOINT, { populate: "*" }, id);
  }

  getMany(): Observable<Event[]> {
    return this.strapi.getMany<Event>(ENDPOINT, {});
  }

}
