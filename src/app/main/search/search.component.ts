import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { API_Video, Video } from 'src/app/models/API_Video.model';
import { environment } from 'src/environments/environment';
import { VideoListService } from '../video-list/video-list.service';

@Component({
	selector: 'app-search',
	templateUrl: './search.component.html',
	styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
	key = '';
	isLoading = false;
	videos: Video[] = [];
	total = 0;
	page = 0;
	sub: Subscription | undefined;
	API_URL = environment.API_URL;
	time_out: any;
	constructor(
		private videoListService: VideoListService,
		private http: HttpClient
	) {}

	ngOnInit(): void {
		this.sub = this.videoListService.loadMore.subscribe(
			this.fetchSearchVideos.bind(this)
		);
	}
	fetchSearchVideos() {
		console.log(this.http);

		this.http
			.get<API_Video>(this.API_URL + '/video/search', {
				params: new HttpParams()
					.set('search', this.key)
					.append('page', this.page + 1),
			})
			.subscribe(({ videos, total }) => {
				const v = [...videos].map((vid) => ({
					...vid,
					createdAt: new Date(vid.createdAt),
				}));

				this.videos.push(...v);
				this.page++;
				this.total = total;
			});
	}
	onSearchChange(event: Event) {
		if (this.time_out) {
			clearTimeout(this.time_out);
		}
		this.key = (event.target as HTMLInputElement).value;
		this.page = 0;
		this.total = 0;
		this.videos = [];
		this.time_out = setTimeout(this.fetchSearchVideos.bind(this), 500);
	}
}
