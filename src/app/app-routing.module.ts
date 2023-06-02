import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './main/home/home.component';
import { SearchComponent } from './main/search/search.component';
import { VideoPlayerComponent } from './main/video-player/video-player.component';

const routes: Routes = [
	{ path: '', component: HomeComponent, pathMatch: 'full' },
	{ path: 'search', component: SearchComponent },
	{ path: 'auth', component: AuthComponent },
	{ path: 'trending', component: VideoPlayerComponent },
	{ path: 'sub', component: AuthComponent },
	{ path: 'library', component: AuthComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
