import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";

const URL = environment.STRAPI_URL;


@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private base = URL;

  constructor() { }

  public getImgUrl(url: string): string {
    return this.base + url;
  }
}
