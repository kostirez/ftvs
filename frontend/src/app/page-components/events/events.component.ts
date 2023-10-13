import { Component, OnDestroy, OnInit } from '@angular/core';
import { EventService } from "../../strapi-services/event.service";
import { Event } from "../../strapi-model/event";
import { ImageService } from "../../core/image.service";
import { Router } from "@angular/router";

interface Category {
  displeyName: string;
  category: string;
}

const CATEGORIES: Category[] = [
  {displeyName: "Naše akce", category: "nase" },
  {displeyName: "Účastníme se", category: "cizi" },
]

interface EventsInMonth {
  month: {
    name: string,
    num: number,
    year?: number,
  };
  count: number;
}
@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit, OnDestroy {

  public events: Event[] = [];

  public categories = CATEGORIES;

  public currentCategory = CATEGORIES[0];

  public timeCategories: EventsInMonth[] = [{month: {name: "Všechno", num: -1}, count: 0}]

  public currentTimeCategory: EventsInMonth = this.timeCategories[0];

  private sub;

  constructor(
    private eventService: EventService,
    private imageService: ImageService,
    private router: Router,
  ) {
    this.timeCategories.push(...this.fillMonths());
    this.sub = this.eventService.getMany().subscribe(
      events => {
        this.events = events.filter(e => e.startDate > new Date());
        this.updateMonthCounts();
      }
    );
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

  private fillMonths(): EventsInMonth[] {
    const months = ["led", "úno", "bře", "dub", "kvě", "čvn", "čvc", "srp", "zář", "říj", "lis", "pro"];
    const d = new Date();
    const monthsWithNum = months.map((m, index) =>
      ({
        month: {
          name: m,
          num: index,
          year: d.getMonth() <= index ? d.getFullYear() : d.getFullYear() +1
        },
        count: 0
      }))
    const thisYear = monthsWithNum.slice(d.getMonth());
    const nextYear = monthsWithNum.slice(0,d.getMonth());
    return [...thisYear, ...nextYear];
  }

  selectCategory(category: Category) {
    this.currentCategory = category;
  }

  selectTimeCategory(category: EventsInMonth) {
    this.currentTimeCategory = category;
  }

  updateMonthCounts(): void {
    this.timeCategories[0].count = this.events.length;
    this.events.forEach(e => {
      const category = this.timeCategories.find(c => c.month.num === e.startDate.getMonth())
      if (category){
        category.count += 1;
      }
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  shouldBeDispley(event: Event) {
    const correctMonth =
      event.startDate.getMonth() === this.currentTimeCategory.month.num
      || this.currentTimeCategory.month.num === -1;
    const correctCategory =
      this.currentCategory.category === event.category;
    return correctCategory && correctMonth;
  }
}
