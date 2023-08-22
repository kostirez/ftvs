import { Injectable } from "@angular/core";
import { StrapiService } from "../core/strapi.service";
import { Observable } from "rxjs";
import { PublicUser } from "../strapi-model/user";
import { map } from "rxjs/operators";

export interface AboutPageData {
  main: string;
  people: PublicUser[];
}

@Injectable({
  providedIn: 'root'
})
export class AboutService {
  constructor(private strapi: StrapiService) { }

  getAbout(): Observable<AboutPageData> {

    return this.strapi.getSingleType<AboutPageData>("about-page", { "populate[people][populate]": "avatar"})
      .pipe(
        map(data => (
          {
            ...data,
            people: data.people.map(
              u => ({
                ...u,
                // @ts-ignore
                avatar: u.avatar.data.attributes
              })
            )
          }
      ))
      )
  }
}
