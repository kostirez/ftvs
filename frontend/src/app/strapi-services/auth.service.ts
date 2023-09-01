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

  private _currentUser: User | null;

  private jwtToken: string | null;

  private authenticated = false

  public get jwt() {
    return this.jwtToken;
  }

  public get user$(): Observable<User> {
    return this.currentUser$;
  }

  public get currentUser(): User | null {
    return this._currentUser;
  }

  public get userId(): number | null {
    if (this._currentUser) {
      return this._currentUser.id
    } else {
      return null;
    }
  }

  constructor(private userService: UserService) {
    this._currentUser = null;
    this.jwtToken = null;
    this.currentUser$
      .subscribe(user => {
        this._currentUser = user;
    });
  }

  loginIn(identifier: string, password: string): Promise<number> {
    if (this.authenticated && this.jwt) {
      return Promise.reject();
    }

    let promiseResolve: (value: (number | PromiseLike<number>)) => void;
    let promiseReject: (value: (number | PromiseLike<number>)) => void;

    const promise = new Promise<number>((resolve, reject) => {
      promiseResolve = resolve;
      promiseReject = reject
    });

    this.userService.userLogin(identifier, password)
      .toPromise()
      .then(authUser => {
        this.currentUserSubject$.next(authUser.user);
        this.jwtToken = authUser.jwt;
        promiseResolve(authUser.user.id);
      })
      .catch(e => {
        promiseReject(e.error);
      });
    return promise;
  }

  createAccount(
    username: string,
    email: string,
    password: string,
  ): Promise<number> {
    if (this.authenticated || this.jwtToken) {
      this.logoff();
      return Promise.reject();
    }

    let promiseResolve: (value: (number | PromiseLike<number>)) => void;
    let promiseReject: (value: (number | PromiseLike<number>)) => void;

    const promise = new Promise<number>((resolve, reject) => {
      promiseResolve = resolve;
      promiseReject = reject
    });

    this.userService.createUser(username, email, password)
      .toPromise()
      .then(authUser => {
        this.currentUserSubject$.next(authUser.user);
        this.jwtToken = authUser.jwt;
        promiseResolve(authUser.user.id);
      })
      .catch(e => {
        promiseReject(e.error.error);
    });
    return promise;
  }

  public logoff() {
    this.currentUserSubject$.next(undefined);
    this.jwtToken = null;
    // redirect to login page
  }

}
