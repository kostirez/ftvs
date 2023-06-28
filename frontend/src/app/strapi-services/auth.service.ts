import { Injectable } from '@angular/core';
import { UserService } from "./user.service";
import { User } from "../strapi-model/user";
import { Observable, Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject$: Subject<User> = new Subject<User>();
  private currentUser$: Observable<User> = this.currentUserSubject$.asObservable();

  private jwtToken: string | null;

  private authenticated = false

  public get jwt() {
    return this.jwtToken;
  }

  public get user() {
    return this.currentUser$;
  }

  constructor(private userService: UserService) {
    this.jwtToken = null;
    this.currentUser$.subscribe(user => console.log("user", user));
  }

  loginIn(identifier: string, password: string): void {
    if (this.authenticated && this.jwt) {
      return;
    }
    this.userService.userLogin(identifier, password)
      .subscribe(authUser => {
        this.currentUserSubject$.next(authUser.user);
        this.jwtToken = authUser.jwt;
      })
  }

  createAccount(
    username: string,
    email: string,
    password: string,
  ): void {
    if (this.authenticated || this.jwtToken) {
      this.logoff();
    }
    this.userService.createUser(username, email, password)
      .subscribe(authUser => {
        this.currentUserSubject$.next(authUser.user);
        this.jwtToken = authUser.jwt;
      })
  }

  public logoff() {
    this.currentUserSubject$.next(undefined);
    this.jwtToken = null;
    // redirect to login page
  }

}
