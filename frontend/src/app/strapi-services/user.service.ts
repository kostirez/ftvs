import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { AuthUser, User } from "../strapi-model/user";
import { StrapiService } from "../core/strapi.service";
import { map, tap } from "rxjs/operators";

const ENDPOINT_USER = "users"
const ENDPOINT_REGISTER = "auth/local/register";
const ENDPOINT_LOCAL = "auth/local";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private strapi: StrapiService,
  ) {
  }

  public createUser(
    username: string,
    email: string,
    password: string,
    ): Observable<AuthUser> {
    return this.strapi
      .postNoData<AuthUser>(ENDPOINT_REGISTER, {
        username,
        email,
        password,
    });
  }

  public userLogin(identifier: string, password: string): Observable<AuthUser> {
    return this.strapi
      .postNoData<AuthUser>(ENDPOINT_LOCAL, {
        identifier,
        password,
      });
  }

  public getUserPic(user: User): Observable<string> {
    return this.strapi.getOne<User>(ENDPOINT_USER, {populate: "avatar"}, user.id)
      .pipe(
        tap(u => console.log("u", u)),
        map(u => u.avatar.url)
      )
  }
}

