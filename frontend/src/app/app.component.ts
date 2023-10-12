import { Component, OnDestroy } from '@angular/core';
import { AuthService } from "./strapi-services/auth.service";
import { User } from "./strapi-model/user";
import { AboutService, Contact } from "./strapi-services/about.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy{
  title = 'frontend';

  user: User | null = null;

  navbarOpen = false;

  contact: Contact | null = null;

  subs: Subscription[] = []

  constructor(private authService: AuthService,
              private aboutService: AboutService) {
    this.subs.push(
      this.authService.user$.subscribe(user => this.user = user));
    this.subs.push(
      this.aboutService.getContacts().subscribe(c => this.contact = c));
  }

  logOff() {
    this.authService.logoff();
    this.toggleNavbar();
  }


  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }
}
