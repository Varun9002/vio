import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
	Subscription,
	catchError,
	map,
	switchMap,
	take,
	throwError,
} from 'rxjs';
import { API_Video, User, Video } from 'src/app/models/API_Video.model';
import { AppState } from 'src/app/store/app.reducer';
import { environment } from 'src/environments/environment';
import { VideoListService } from '../video-list/video-list.service';

@Component({
	selector: 'app-user-profile',
	templateUrl: './user-profile.component.html',
	styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit, OnDestroy {
	isLoading = false;
	page = 1;
	total = 0;
	userId: string = '';
	user: User | undefined;
	videos: Video[] = [];
	subs: Subscription | undefined;
	API_URL = environment.API_URL;
	url = '';
	myProfile: boolean = false;
	editMode = false;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private videoListService: VideoListService,
		private http: HttpClient,
		private store: Store<AppState>
	) {}

	ngOnInit(): void {
		this.myProfile = this.route.snapshot.data['myProfile'];
		if (this.myProfile) {
			this.url = 'myProfile';
			this.store
				.select('auth')
				.pipe(take(1))
				.subscribe((authData) => {
					this.userId = authData.user!.id;
				});
		} else {
			this.userId = this.route.snapshot.params['userId'];
			this.url = this.userId;
		}
		this.isLoading = true;
		this.http
			.get<{ message: string; data: User }>(
				environment.API_URL + '/user/' + this.url
			)
			.subscribe((resData) => {
				this.user = resData.data;
			});
		this.subs = this.videoListService.loadMore
			.pipe(
				switchMap(() => {
					this.isLoading = true;
					return this.http.get<API_Video>(
						environment.API_URL +
							'/user/' +
							this.userId +
							'/videos',
						{ params: { page: this.page } }
					);
				}),
				map((resData) => {
					resData.videos = resData.videos.map((video) => ({
						...video,
						createdAt: new Date(video.createdAt),
					}));
					return resData;
				}),
				catchError((err: HttpErrorResponse) => {
					this.router.navigate(['/error']);
					return throwError(() => err);
				})
			)
			.subscribe((resData) => {
				if (resData.videos.length > 0) {
					this.videos.push(...resData.videos);
					this.page++;
				}
				this.total = resData.total;
				this.isLoading = false;
			});
		this.videoListService.loadMore.next();
	}
	onEditProfile() {
		this.editMode = true;
	}
	ngOnDestroy(): void {
		if (this.subs) {
			this.subs.unsubscribe();
		}
	}
	onEditEmit(n: number) {
		console.log(n);

		if (n === 2) this.editMode = false;
		if (n === 0) this.isLoading = false;
		if (n === 1) this.isLoading = true;
	}
}
