import { Component, OnInit } from '@angular/core';
import { Observable, of } from "rxjs";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  public $about: Observable<string>

  constructor(
  ) {
    this.$about = of("o nas blablablablablablablabla");
  }

  ngOnInit(): void {
  }

}
