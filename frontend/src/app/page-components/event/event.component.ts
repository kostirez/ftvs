import { Component, OnDestroy, OnInit } from '@angular/core';
import { EventService } from "../../strapi-services/event.service";
import { Event } from "../../strapi-model/event";
import { Observable, Subscription } from "rxjs";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit, OnDestroy {

  public $event = new Observable<Event>();

  private  sub: Subscription;

  constructor(private eventService: EventService,
              private route: ActivatedRoute) {
    this.sub = this.route.params.subscribe(params => {
      this.$event = this.eventService.getOne(params['id'])
    });

  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
