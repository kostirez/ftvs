import { Component, OnInit } from '@angular/core';
import { AboutPageData, AboutService } from "../../strapi-services/about.service";
import { Observable } from "rxjs";
import { UserService } from "../../strapi-services/user.service";
import {  User } from "../../strapi-model/user";
import { ImageService } from "../../core/image.service";
import { Sponsor, SponsorService } from "../../strapi-services/sponsor.service";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  data$: Observable<AboutPageData> | null;

  sponsors: Sponsor[] = [];

  constructor(
    private aboutService: AboutService,
    private userService: UserService,
    private imageService: ImageService,
    private sponsorService: SponsorService

  ) {
    this.data$ = this.aboutService.getAbout()

    this.data$.subscribe(s => console.log(s.people[0].avatar))
    this.sponsorService.getMany().subscribe(s => {
      this.sponsors = s
    });
  }

  public getImg(user: User): string {
    if (user.avatar) {
      return "url" in user.avatar ?
        this.imageService.getImgUrl(user.avatar.url) : "";
    }
    return "";
  }

  public getImgSponsor(sponsor: Sponsor): string {
    if (sponsor.logo) {
      return "url" in sponsor.logo ?
        this.imageService.getImgUrl(sponsor.logo.url) : "";
    }
    return "";
  }

  ngOnInit(): void {
  }

}
