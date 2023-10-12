import { Injectable } from "@angular/core";
import { StrapiService } from "../core/strapi.service";
import { Observable } from "rxjs";
import { User } from "../strapi-model/user";
import { map } from "rxjs/operators";

export interface AboutPageData {
  main: string;
  people: User[];
}

export interface Contact {
  name: string;
  address: string;
  ico: number;
  email: string;
  accountNumber: string;
  fbLink: string;
  igLink: string;
}

export interface AboutMembership {
  mainText: string;
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

  getContacts(): Observable<Contact> {
    return this.strapi.getSingleType<Contact>("contact", {});
  }

  getAboutMembership(): Observable<AboutMembership> {
    return this.strapi.getSingleType<AboutMembership>("about-membership", {});
  }
}
