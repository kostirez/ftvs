import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

const LOCAL_URL = "http://localhost:1337/api/";

@Injectable({
  providedIn: 'root'
})
export class StrapiService {

  constructor(private http: HttpClient) { }

  public getOne<T>(endpoint: string, params: {}, id: number): Observable<T> {
    return this.http
      .get<{data: StrapiObj<T>}>(this.getUrl(endpoint, id), {
        params,
      }).pipe(
        map(obj => (obj.data)),
        map(data => ({...data.attributes}) as T)
      )
  }

  public getMany<T>(endpoint: string, params: {}): Observable<T[]> {
    return this.http
      .get<{data: StrapiObj<T>[]}>(this.getUrl(endpoint), {
        params,
      }).pipe(
        map(obj => obj.data),
        map(data => data.map(item => item.attributes as T))
      )
  }


  public post<T>(endpoint: string, data: T): Observable<T> {
    return this.http
      .post<T>(this.getUrl(endpoint), {
          data
        });
  }

  public put(endpoint: string, data: {}, id: number): Observable<{}> {
    return this.http
      .put(this.getUrl(endpoint, id), {
        data
      });
  }

  private getUrl(endpoint: string, id?: number): string {
    endpoint += id ? `/${id}` : "";
    return LOCAL_URL + endpoint;
  }

}

export interface StrapiObj<T> {
  id: number;
  attributes: {
    "createdAt": Date,
    "updatedAt": Date,
    "publishedAt": Date,
  } & T;
}
