import { Pipe, PipeTransform } from '@angular/core';
import { Event } from "../strapi-model/event";

@Pipe({
  name: 'filterEvents'
})
export class FilterEventsPipe implements PipeTransform {

  transform(values: Event[], month: number, type: string): Event[] {
    return values.filter(e => this.shouldBeDispley(e, type, month));
  }

  shouldBeDispley(event: Event, category: string, month: number) {
    const correctMonth =
      event.startDate.getMonth() === month || month === -1;
    const correctCategory =
      category === event.category;
    return correctCategory && correctMonth;
  }

}
