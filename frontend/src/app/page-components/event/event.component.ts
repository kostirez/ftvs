import { Component, OnDestroy, OnInit } from '@angular/core';
import { EventService } from "../../strapi-services/event.service";
import { Event } from "../../strapi-model/event";
import { Observable, Subscription } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { Photo } from "../../strapi-model/img";
import { ImageService } from "../../core/image.service";
import { PhotoService } from "../../strapi-services/photo.service";
import { AuthService } from "../../strapi-services/auth.service";
import { ApplicationService } from "../../strapi-services/application.service";
import { Application } from "../../strapi-model/application";

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: [ './event.component.scss' ]
})
export class EventComponent implements OnInit, OnDestroy {

  private id: number = -1;

  public $event = new Observable<Event>();

  public photos$ = new Observable<Photo[]>()

  private sub: Subscription;

  applicationStep = 0

  // for user without registration
  public name = "";
  public email = "";
  guestError = "";

  constructor(private eventService: EventService,
              private imageService: ImageService,
              private photoService: PhotoService,
              private authService: AuthService,
              private applicationService: ApplicationService,
              private router: Router,
              private route: ActivatedRoute) {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.$event = this.eventService.getOne(this.id)
      this.photos$ = this.photoService.getPhotosForEventId(this.id)
    });

  }

  public getImg(photo: Photo): string {
    if (photo.img) {
      return "url" in photo.img ?
        this.imageService.getImgUrl(photo.img.url) : "";
    }
    return "";
  }


  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  goToRegistration() {
    this.router.navigate([ '/login' ]);
  }

  startRegistration() {
    const user = this.authService.currentUser;
    if (!user) {
      this.applicationStep = 1;
    } else {
      this.applicationStep = 2;
    }
  }

  continueAsAGuest() {
    if (this.name && this.email) {
      this.applicationStep = 2;
    } else {
      this.guestError = "Zadejte validní jmeno a email"
    }
  }

  registerForEvent(event: Event) {
    const user = this.authService.currentUser;
    this.applicationStep = 3;
    let application: Application;
    if (user && user.id) {
      application = {
        approved: false,
        eventId: event.id,
        userId: user.id,
        submitDate: new Date,
      }
    } else {
      application = {
        approved: false,
        eventId: event.id,
        submitDate: new Date,
        guestName: this.name,
        guestEmail: this.email,
      }
    }
    this.applicationService.add(application).toPromise()
      .then(resp => {

        console.log("resp", resp);
        console.log("application", application);
        this.applicationStep = 4;
      })
      .catch(e => {
        console.error("error", e);
        this.applicationStep = 3;
      });

  }

  goBackToEventDetail() {
    this.applicationStep = 0;
  }
}
