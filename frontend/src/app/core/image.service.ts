import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private base = "http://localhost:1337"

  constructor() { }

  public getImgUrl(url: string): string {
    return this.base + url;
  }
}
