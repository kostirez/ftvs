import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../strapi-services/auth.service";
import { User } from "../../strapi-model/user";
import { Application } from "../../strapi-model/application";
import { ApplicationService } from "../../strapi-services/application.service";
import { EventService } from "../../strapi-services/event.service";
import { Observable } from "rxjs";
import { Event } from "../../strapi-model/event";
import { tap } from "rxjs/operators";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  public user: User | null = null;

  organizedEvents$: Observable<Event[]> | null = null;
  applications$: Observable<Application[]> | null = null;

  constructor(private authService: AuthService,
              private eventService: EventService,
              private applicationService: ApplicationService) {
    this.user = this.authService.currentUser;
    if (this.user) {
      this.organizedEvents$ = this.eventService.getEventsByOrganizer(this.user.publicUserId)
      this.applications$ = this.applicationService.getApplicationsForUserId(this.user.publicUserId)
    }
  }

  ngOnInit(): void {
  }

}
