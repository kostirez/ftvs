import { Component, OnInit } from '@angular/core';
import { EventService } from "../../strapi-services/event.service";
import { Event } from "../../strapi-model/event";
import { ImageService } from "../../core/image.service";
import { Router } from "@angular/router";
import { Observable } from "rxjs";

const CATEGORIES = [
  "nadchazejici",
  "Probehle",
]

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  public $nearEvents: Observable<Event[]>;

  public categories = CATEGORIES;

  public currentCategory = CATEGORIES[0];

  constructor(
    private eventService: EventService,
    private imageService: ImageService,
    private router: Router,
  ) {
    this.$nearEvents = this.eventService.getMany();
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

  selectCategory(category: string) {
    this.currentCategory = category;
  }
}
