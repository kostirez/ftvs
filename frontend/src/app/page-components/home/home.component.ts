import { Component, OnInit } from '@angular/core';
import { EventService } from "../../strapi-services/event.service";
import { ImageService } from "../../core/image.service";

interface HomeItem {
  headline: string;
  btnText: string;
  link: string;
  pic: string;
  className: string;
}

const HOME_ITEMS: HomeItem[] = [
  {
    headline: "Akce",
    btnText: "vsechny akce",
    link: "/events",
    pic: "./assets/akce_mia.jpeg",
    className: "bi-calendar3",
  },
  {
    headline: "Kdo jsem",
    btnText: "vice info",
    link: "/about",
    pic: "./assets/akce_mia.jpeg",
    className: "bi-info-circle",
  },
  {
    headline: "Galerie",
    btnText: "galerie",
    link: "/gallery",
    pic: "./assets/akce_mia.jpeg",
    className: "bi-file-image",
  },
]


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  items = HOME_ITEMS;

  constructor(
    private eventService: EventService,
    private imageService: ImageService,
  ) {
  }

  ngOnInit(): void {
  }

}
