import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';
import { Video } from 'src/app/models/API_Video.model';
import { environment } from 'src/environments/environment';
import * as HomeActions from './home.action';
@Injectable()
export class HomeEffects {
	constructor(private actions$: Actions, private http: HttpClient) {}

	fetchVideos$ = createEffect(() =>
		this.actions$.pipe(
			ofType(HomeActions.FetchVideos),
			switchMap(({ page }) =>
				this.http
					.get<{
						message: string;
						videos: Video[];
						total: number;
					}>(environment.API_URL + '/video/all', {
						params: { page: page + 1 },
					})
					.pipe(
						map((res) => {
							let modPage = page;
							if (res.videos.length > 0) modPage++;
							return {
								videos: res.videos,
								totalVideos: res.total,
								page: modPage,
							};
						}),
						map((videos) => {
							videos.videos = videos.videos.map((video) => ({
								...video,
								createdAt: new Date(video.createdAt),
							}));
							return HomeActions.LoadVideos(videos);
						})
					)
			)
		)
	);
}
