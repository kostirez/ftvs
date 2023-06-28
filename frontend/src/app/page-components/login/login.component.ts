import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../strapi-services/auth.service";

type TabType = "login" | "registration";

interface Tab {
  tabType: TabType;
  label: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  tab: Tab;

  username = "";
  email = "";
  password = "";

  constructor(private authService: AuthService) {
    this.tab = {
      tabType: "login",
      label: "login",
    }
  }

  ngOnInit(): void {
  }

  activateTab(type: TabType) {
    this.tab.tabType = type;
  }

  createAccount() {
    this.authService.createAccount(this.username,this.email, this.password)
  }

  logIn() {
    this.authService.loginIn(this.email, this.password)
  }
}
