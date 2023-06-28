import { Component } from '@angular/core';
import { AuthService } from "./strapi-services/auth.service";
import { User } from "./strapi-model/user";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';

  user: User | null = null;

  navbarOpen = false;

  constructor(private authService: AuthService) {
    this.authService.user.subscribe(user => {
      this.user = user;
    });
  }

  logOff() {
    this.authService.logoff();
  }


  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }
}
