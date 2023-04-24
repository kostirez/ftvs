import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

const LOCAL_URL = "http://localhost:1337/api/";

@Injectable({
  providedIn: 'root'
})
export class StrapiService {

  constructor(private http: HttpClient) { }

  public get<T>(endpoint: string, params: {}): Observable<T> {
    return this.http
      .get<T>(this.getUrl(endpoint), {
        params,
      });
  }


  public post<T>(endpoint: string, data: T): Observable<T> {
    return this.http
      .post<T>(this.getUrl(endpoint), {
          data
        });
  }

  public put<T>(endpoint: string, data: T, id: string): Observable<T> {
    return this.http
      .put<T>(this.getUrl(endpoint, id), {
        data
      });
  }

  private getUrl(endpoint: string, id: string = ""): string {
    endpoint += id ? `/${id}` : "";
    return LOCAL_URL + endpoint;
  }

}
