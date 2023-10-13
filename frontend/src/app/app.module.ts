import { NgModule, SecurityContext } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './page-components/home/home.component';
import { LoginComponent } from './page-components/login/login.component';
import { UserComponent } from './page-components/user/user.component';
import { EventComponent } from './page-components/event/event.component';
import { EventsComponent } from './page-components/events/events.component';
import { AboutComponent } from './page-components/about/about.component';
import { GalleryComponent } from './page-components/gallery/gallery.component';
import { DocumentsComponent } from './page-components/documents/documents.component';
import { FilterEventsPipe } from "./pipes/event.pipe";
import { MarkdownModule } from "ngx-markdown";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    UserComponent,
    EventComponent,
    EventsComponent,
    AboutComponent,
    GalleryComponent,
    DocumentsComponent,
    FilterEventsPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MarkdownModule.forRoot({ loader: HttpClient, sanitize: SecurityContext.NONE })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
