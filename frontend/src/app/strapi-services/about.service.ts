import { Injectable } from "@angular/core";
import { StrapiService } from "../core/strapi.service";
import { Observable } from "rxjs";
import { Member } from "../strapi-model/user";

export interface AboutPageData {
  main: string;
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

    return this.strapi.getSingleType<AboutPageData>("about-page", { })
  }

  getContacts(): Observable<Contact> {
    return this.strapi.getSingleType<Contact>("contact", {});
  }

  getAboutMembership(): Observable<AboutMembership> {
    return this.strapi.getSingleType<AboutMembership>("about-membership", {});
  }

  getMembers(): Observable<Member[]> {
    return this.strapi.getMany<Member>("members", {populate: "*"});
  }
}
