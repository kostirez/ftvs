import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./page-components/home/home.component";
import { LoginComponent } from "./page-components/login/login.component";
import { UserComponent } from "./page-components/user/user.component";
import { EventComponent } from "./page-components/event/event.component";
import { EventsComponent } from "./page-components/events/events.component";
import { AboutComponent } from "./page-components/about/about.component";
import { GalleryComponent } from "./page-components/gallery/gallery.component";

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'about', component: AboutComponent },
  { path: 'events', component: EventsComponent },
  { path: 'gallery', component: GalleryComponent },
  { path: 'user/:id', component: UserComponent },
  { path: 'event/:id', component: EventComponent },
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
