import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';
import { HomeResolverService } from './main/home/home-resolver.service';
import { HomeComponent } from './main/home/home.component';
import { SearchComponent } from './main/search/search.component';
import { UserProfileComponent } from './main/user-profile/user-profile.component';
import { VideoPlayerResolver } from './main/video-player/video-player-resolver.service';
import { VideoPlayerComponent } from './main/video-player/video-player.component';
import { ErrorPageComponent } from './shared/error-page/error-page.component';

const routes: Routes = [
	{
		path: '',
		component: HomeComponent,
		canActivate: [AuthGuard],
		data: { storeKey: 'home' },
		pathMatch: 'full',
		resolve: { data: HomeResolverService },
	},
	{
		path: 'watch/:vid_id',
		component: VideoPlayerComponent,
		canActivate: [AuthGuard],
		// pathMatch: 'full',
		resolve: { data: VideoPlayerResolver },
	},
	{ path: 'search', component: SearchComponent, canActivate: [AuthGuard] },
	{
		path: 'myProfile',
		component: UserProfileComponent,
		data: { myProfile: true },
		canActivate: [AuthGuard],
	},
	{
		path: 'user/:userId',
		component: UserProfileComponent,
		data: { myProfile: false },
		canActivate: [AuthGuard],
	},
	{ path: 'auth', component: AuthComponent },
	{ path: 'sub', component: AuthComponent, canActivate: [AuthGuard] },
	{ path: 'library', component: AuthComponent, canActivate: [AuthGuard] },
	{ path: '**', component: ErrorPageComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
