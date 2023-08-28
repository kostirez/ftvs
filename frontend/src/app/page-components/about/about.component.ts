import { Component, OnInit } from '@angular/core';
import { AboutPageData, AboutService } from "../../strapi-services/about.service";
import { Observable } from "rxjs";
import { UserService } from "../../strapi-services/user.service";
import { PublicUser } from "../../strapi-model/user";
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