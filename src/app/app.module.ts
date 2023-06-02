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
import { VideoPlayerComponent } from './main/video-player/video-player.component';
import { CommentComponent } from './main/video-player/comment/comment.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    SearchComponent,
    HomeComponent,
    VideoListComponent,
    VideoItemComponent,
    AuthComponent,
    VideoPlayerComponent,
    CommentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
