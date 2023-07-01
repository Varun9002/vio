import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Video } from 'src/app/models/API_Video.model';
import * as fromApp from '../../store/app.reducer';
import { VideoListService } from '../video-list/video-list.service';
import * as HomeActions from './store/home.action';
@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
	isLoading = false;
	videos: Video[] = [];
	total = 1;
	page = 0;
	sub: Subscription | undefined;
	constructor(
		private store: Store<fromApp.AppState>,
		private videoListService: VideoListService
	) {}

	ngOnInit(): void {
		this.store.select('home').subscribe((homeState) => {
			this.videos = homeState.videos;
			this.total = homeState.totalVideos;
			this.page = homeState.loadedPage;
			this.isLoading = homeState.isLoading;
		});
		this.sub = this.videoListService.loadMore.subscribe(() => {
			this.store.dispatch(HomeActions.FetchVideos({ page: this.page }));
		});
	}
	ngOnDestroy(): void {
		if (this.sub) {
			this.sub.unsubscribe();
		}
		this.sub = undefined;
	}
}
