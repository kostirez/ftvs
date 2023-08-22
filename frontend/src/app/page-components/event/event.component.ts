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
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit, OnDestroy {

  private id: number = -1;

  public $event = new Observable<Event>();

  public photos$ = new Observable<Photo[]>()

  private sub: Subscription;

  applicationStep = 0

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

  startRegistration() {
    const user = this.authService.currentUser;
    if(!user) {
      this.router.navigate(['/login' ]);
    } else {
      this.applicationStep = 1;
    }
  }

  registerForEvent(event: Event) {
    const user = this.authService.currentUser;
    this.applicationStep = 2;
    if(user && user.id) {
      const application: Application = {
        approved: false,
        eventId: event.id,
        userId: user.publicUserId,
        submitDate: new Date,
      }
      this.applicationService.add(application).toPromise()
        .then(resp => {

          console.log("resp", resp);
          console.log("application", application);
          this.applicationStep = 3;
        })
        .catch(e => {
          console.error("error", e);
          this.applicationStep = 2;
        })

    }
  }

  goBackToEventDetail() {
    this.applicationStep = 0;
  }
}
