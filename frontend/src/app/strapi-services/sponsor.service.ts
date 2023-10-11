import { Injectable } from "@angular/core";
import { StrapiService } from "../core/strapi.service";
import { Observable } from "rxjs";
import { Img } from "../strapi-model/img";

const ENDPOINT = "sponsors"

export interface Sponsor {
  name: string;
  logo: Img;
}

@Injectable({
  providedIn: 'root'
})
export class SponsorService {

  constructor(private strapi: StrapiService) {
  }

  getMany(): Observable<Sponsor[]> {
    return this.strapi.getMany<Sponsor>(ENDPOINT, {populate: "*"})
  }
}
