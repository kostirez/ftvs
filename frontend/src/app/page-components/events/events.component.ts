import { Component, OnInit } from '@angular/core';
import { EventService } from "../../strapi-services/event.service";
import { Event } from "../../strapi-model/event";
import { ImageService } from "../../core/image.service";
import { Router } from "@angular/router";



@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  public events: Event[] = [];

  constructor(
    private eventService: EventService,
    private imageService: ImageService,
    private router: Router,
  ) {
    this.eventService.getMany()
      .subscribe(items => {
        this.events = items;
      })
  }

  ngOnInit(): void {
  }

  public getImg(event: Event): string {
    if (event.img) {
      return "url" in event.img ?
        this.imageService.getImgUrl(event.img.url) : "";
    }
    return "";
  }

  public navigateToEvent(id: number) {
    this.router.navigate(['/event', "" + id]);
  }
}
