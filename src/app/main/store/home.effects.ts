import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Video } from './home.reducer';
import { Injectable } from '@angular/core';
import * as HomeActions from './home.action';
import { map, switchMap } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { API_VideoRoot } from 'src/app/models/video.model';
@Injectable()
export class HomeEffects {
	constructor(private actions$: Actions, private http: HttpClient) {}

	fetchVideos$ = createEffect(() =>
		this.actions$.pipe(
			ofType(HomeActions.FetchVideos),
			switchMap(() =>
				this.http
					.get<API_VideoRoot>(
						'https://api.pexels.com/videos/popular',
						{
							headers: new HttpHeaders({
								Authorization:
									'vF1VMm6sxxTBAJFLWygeYklNvloKRDfQ2lN60uzXXSjTe5dO1aUy7k6l',
							}),
						}
					)
					.pipe(
						map((res) => {
							const videos: Video[] = [];
							for (const video of res.videos) {
								let v: Video = {
									id: video.id,
									title: video.url
										.substring(
											video.url
												.substring(
													0,
													video.url.length - 1
												)
												.lastIndexOf('/') + 1
										)
										.substring(0, video.url.length - 1),
									uploadDate: new Date(),
									views: 12,
									thumbnail: video.image,
									duration: video.duration,
									url: video.video_files[0].link,
									user: {
										id: video.user.id,
										name: video.user.name,
										imgURL: video.user.url,
									},
								};
								videos.push(v);
							}
							return videos;
						}),
						map((videos) => {
							return HomeActions.LoadVideos({ videos });
						})
					)
			)
		)
	);
}
