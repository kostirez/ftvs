import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from "../../strapi-services/auth.service";
import { Router } from "@angular/router";
import { UserService } from "../../strapi-services/user.service";
import { AboutMembership, AboutService } from "../../strapi-services/about.service";
import { Subscription } from "rxjs";

type TabType = "login" | "registration";

interface Tab {
  tabType: TabType;
  label: string;
}

const TABS: Tab[] = [
  {
    tabType: "login",
    label: "Prihlasit se",
  },
  {
    tabType: "registration",
    label: "Registrovat se",
  }
]

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  tab: Tab;

  tabs = TABS;

  membership: AboutMembership | null = null;

  username = "";
  email = "";
  password = "";

  error = "";

  subs: Subscription[] = []

  constructor(private authService: AuthService,
              private router: Router,
              private userService: UserService,
              private aboutService: AboutService,
  ) {
    this.tab = this.tabs[0];
    this.subs.push(
      this.aboutService.getAboutMembership().subscribe(m => this.membership = m));
  }


  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

  activateTab(t: Tab) {
    this.tab = t;
  }

  createAccount() {
    if (!this.username || !this.password || !this.email) {
      this.error ="zadejte vsechny udaje";
      return
    } else {
      this.error = "";
    }
    this.authService.createAccount(this.username, this.email, this.password)
      .then(id => {
        console.log("create", this.authService.currentUser?.id);
        this.router.navigate([ '/user', "" + id ])
      })
      .catch(err => {
        switch (err.name) {
          case "ValidationError": {
            this.error = "zkontrolujte, ze je mail ve spravnem formatu, username ma alespon 3 znaky a heslo 6"
            break;
          }
          case "ApplicationError": {
            this.error = "zadany mail nebo username je uz zabrano";
            break;
          }
          default: {
            this.error = "neznama chyba";
            break;
          }
        }
      })
  }

  logIn() {
    console.log(this.email, this.password)
    if (!this.email || !this.password) {
      this.error = "zadejte email a heslo";
      return
    } else {
      this.error = "";
    }
    this.authService.loginIn(this.email, this.password)
      .then(id => {
        this.router.navigate(['/user', "" + id]);
      })
      .catch(err => {
        if (err.name === "ValidationError") {
          this.error = "heslo nebo email neni spravne";
        } else {
          this.error = "neznama chyba";
        }
      })
  }

}
