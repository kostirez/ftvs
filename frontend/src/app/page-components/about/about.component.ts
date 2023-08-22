import { Component, OnInit } from '@angular/core';
import { AboutPageData, AboutService } from "../../strapi-services/about.service";
import { Observable } from "rxjs";
import { UserService } from "../../strapi-services/user.service";
import { PublicUser } from "../../strapi-model/user";
import { mergeMap, tap } from "rxjs/operators";
import { Event } from "../../strapi-model/event";
import { ImageService } from "../../core/image.service";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  data$: Observable<AboutPageData> | null;

  constructor(
    private aboutService: AboutService,
    private userService: UserService,
    private imageService: ImageService,

  ) {
    this.data$ = this.aboutService.getAbout()

    // this.a$ = this.aboutService.getAbout()
    //   .pipe(
    //     mergeMap(d => this.getUserAvatar(d.people[0])),
    //     tap(a => console.log("merge map", a))
    //   )
    // this.a$.subscribe(a=> console.log("a", a));
    this.data$.subscribe(d => {
      console.log("d", d);
    });
  }

  public getUserAvatar(user: PublicUser): Observable<string> {
    console.log("get user", user.id)
    return this.userService.getPublicUserPic(user);
  }

  public getImg(user: PublicUser): string {
    if (user.avatar) {
      return "url" in user.avatar ?
        this.imageService.getImgUrl(user.avatar.url) : "";
    }
    return "";
  }

  ngOnInit(): void {
  }

}
