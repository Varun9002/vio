import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

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
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { appReducers } from './store/app.reducer';
import { HomeEffects } from './main/store/home.effects';

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
		CommentComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		StoreModule,
		HttpClientModule,
		StoreModule.forRoot(appReducers),
		EffectsModule.forRoot([HomeEffects]),
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
