import { Injectable } from '@angular/core';
import { UserService } from "./user.service";
import { User } from "../strapi-model/user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUser: User | null;

  private jwtToken: string | null;

  private authenticated = false

  public get jwt() {
    return this.jwtToken;
  }

  public get user() {
    return this.currentUser;
  }

  constructor(private userService: UserService) {
    this.currentUser = null;
    this.jwtToken = null;
  }

  loginIn(identifier: string, password: string): void {
    if (this.authenticated && this.jwt) {
      return;
    }
    this.userService.userLogin(identifier, password)
      .subscribe(authUser => {
        this.currentUser = authUser.user;
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
        this.currentUser = authUser.user;
        this.jwtToken = authUser.jwt;
      })
  }

  public logoff() {
    this.currentUser = null;
    this.jwtToken = null;
    // redirect to login page
  }

}
