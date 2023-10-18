import { Component, OnDestroy, OnInit } from '@angular/core';
import { AboutPageData, AboutService, Contact } from "../../strapi-services/about.service";
import { Observable, Subscription } from "rxjs";
import { UserService } from "../../strapi-services/user.service";
import { Member, User } from "../../strapi-model/user";
import { ImageService } from "../../core/image.service";
import { Sponsor, SponsorService } from "../../strapi-services/sponsor.service";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit, OnDestroy {

  data$: Observable<AboutPageData> | null;

  sponsors: Sponsor[] = [];
  members: Member[] = [];

  contact: Contact | null = null;

  subs: Subscription[] = []

  constructor(
    private aboutService: AboutService,
    private userService: UserService,
    private imageService: ImageService,
    private sponsorService: SponsorService

  ) {
    this.data$ = this.aboutService.getAbout()
    this.subs.push(
      this.sponsorService.getMany().subscribe(s => this.sponsors = s));
    this.subs.push(
      this.aboutService.getContacts().subscribe(c => this.contact = c));
    this.subs.push(
      this.aboutService.getMembers().subscribe(m => this.members = m));

  }

  public getImg(user: User): string {
    if (user.avatar) {
      return "url" in user.avatar ?
        this.imageService.getImgUrl(user.avatar.url) : "";
    }
    return "";
  }

  public getMemberImg(m: Member): string {
    if (m.picture) {
      return "url" in m.picture ?
        this.imageService.getImgUrl(m.picture.url) : "";
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

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

}
