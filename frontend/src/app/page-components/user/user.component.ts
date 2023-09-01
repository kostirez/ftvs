import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../strapi-services/auth.service";
import { User } from "../../strapi-model/user";
import { ApplicationService } from "../../strapi-services/application.service";
import { EventService } from "../../strapi-services/event.service";
import { Observable } from "rxjs";
import { Event } from "../../strapi-model/event";
import { UserService } from "../../strapi-services/user.service";
import { ImageService } from "../../core/image.service";
import { Router } from "@angular/router";

export interface userApplicationCard {
  name: string;
  start: Date;
  end: Date;
  paid: boolean;
  price: string;
  submitDate: Date;
  id: number
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  public user: User | null = null;

  organizedEvents$: Observable<Event[]> | null = null;
  applicationCards$: Observable<userApplicationCard[]> | null = null;

  constructor(private authService: AuthService,
              private eventService: EventService,
              private imageService: ImageService,
              private userService: UserService,
              private router: Router,
              private applicationService: ApplicationService) {
    this.user = this.authService.currentUser;

    if (this.user) {
      this.organizedEvents$ = this.eventService.getMyEvents();
      this.applicationCards$ = this.applicationService.getApplicationCardsForUserId(this.user.id);
    }
  }

  public getEvent(id: number): Observable<Event> {
    return this.eventService.getOne(id);
  }

  public getImg(user: User): string {
    if (user.avatar) {
      return "url" in user.avatar ?
        this.imageService.getImgUrl(user.avatar.url) : "";
    }
    return "";
  }

  ngOnInit(): void {
  }

  changePassword() {

  }

  deleteAccount() {

  }

  goToLogin() {
    this.router.navigate(['/login' ]);
  }

  goToEvent(id : number) {
    this.router.navigate(['/event/'+ id ]);
  }
  goToEvents() {
    this.router.navigate(['/events']);
  }
}
