import { Injectable } from "@angular/core";
import { StrapiService } from "../core/strapi.service";
import { Observable } from "rxjs";
import { Photo } from "../strapi-model/img";

const ENDPOINT = "photos"

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor(private strapi: StrapiService) {
  }

  getOne(id: number): Observable<Photo> {
    return this.strapi.getOne<Photo>(ENDPOINT, {populate: "*"}, id);
  }

  getMany(): Observable<Photo[]> {
    return this.strapi.getMany<Photo>(ENDPOINT, {populate: "*"})
  }

  getPhotosForEventId(id: number) : Observable<Photo[]> {
    return this.strapi.getMany<Photo>("photos",
      {
        "filters[event][id][$eq]": id,
        populate: "*" })
  }
}
