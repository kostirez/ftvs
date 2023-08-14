import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../strapi-services/auth.service";
import { User } from "../../strapi-model/user";
import { Application } from "../../strapi-model/application";
import { ApplicationService } from "../../strapi-services/application.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  public user: User | null = null;

  userApplications: Application[] = [];

  constructor(private authService: AuthService,
              private applicationService: ApplicationService) {
    this.authService.user$.subscribe(user => {
      this.user = user;
      this.applicationService.getUserApplications(this.user.id)
        .subscribe(applications => this.userApplications = applications);
    });
  }

  ngOnInit(): void {
    this.user = this.authService.CurrentUser;
  }

}
