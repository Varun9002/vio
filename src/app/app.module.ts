import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './sideNav/nav/nav.component';
import { SearchComponent } from './main/search/search.component';
import { HomeComponent } from './main/home/home.component';
import { VideoListComponent } from './main/video-list/video-list.component';
import { VideoItemComponent } from './main/video-list/video-item/video-item.component';
import { AuthComponent } from './auth/auth.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    SearchComponent,
    HomeComponent,
    VideoListComponent,
    VideoItemComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
