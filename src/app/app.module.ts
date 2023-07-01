import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { AuthInterceptorService } from './auth/auth.interceptor.service';
import { LoginFormComponent } from './auth/login-form/login-form.component';
import { SignupFormComponent } from './auth/signup-form/signup-form.component';
import { AuthEffects } from './auth/store/auth.effects';
import { HomeComponent } from './main/home/home.component';
import { HomeEffects } from './main/home/store/home.effects';
import { SearchComponent } from './main/search/search.component';
import { VideoItemComponent } from './main/video-list/video-item/video-item.component';
import { VideoListComponent } from './main/video-list/video-list.component';
import { CommentComponent } from './main/video-player/comment/comment.component';
import { VideoPlayerComponent } from './main/video-player/video-player.component';
import { ErrorPageComponent } from './shared/error-page/error-page.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { NavComponent } from './sideNav/nav/nav.component';
import { appReducers } from './store/app.reducer';
import { UserProfileComponent } from './main/user-profile/user-profile.component';
import { UploadComponent } from './main/upload/upload.component';

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
		SignupFormComponent,
		LoginFormComponent,
		LoadingSpinnerComponent,
		ErrorPageComponent,
  UserProfileComponent,
  UploadComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		ReactiveFormsModule,
		StoreModule,
		HttpClientModule,
		StoreModule.forRoot(appReducers),
		EffectsModule.forRoot([HomeEffects, AuthEffects]),
	],
	providers: [
		{
			provide: HTTP_INTERCEPTORS,
			useClass: AuthInterceptorService,
			multi: true,
		},
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
