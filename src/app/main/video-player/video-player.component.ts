import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs';
import * as fromApp from 'src/app/store/app.reducer';
import { Video } from '../home/store/home.reducer';

@Component({
	selector: 'app-video-player',
	templateUrl: './video-player.component.html',
	styleUrls: ['./video-player.component.css'],
})
export class VideoPlayerComponent implements OnInit {
	showComments = true;
	id!: number;
	video!: Video;
	constructor(
		private store: Store<fromApp.AppState>,
		private route: ActivatedRoute,
		private router: Router
	) {}

	ngOnInit() {
		this.route.params
			.pipe(
				map((params) => {
					return +params['vid_id'];
				}),
				switchMap((id) => {
					this.id = id;
					return this.store.select('home');
				}),
				map((homeState) => {
					return homeState.videos.find((v) => v.id === this.id);
				})
			)
			.subscribe((v) => {
				if (!v) this.router.navigate(['']);
				this.video = v!;
			});
		// this.store.select('home').((homeState) => {
		// 	this.video =
		// 		homeState.videos.find(
		// 			(v) => v.id === +this.route.snapshot.params['vid_id']
		// 		) || <Video>{};
		// 	this.video?.url;
		// });
	}

	toggleComments(comments: boolean) {
		this.showComments = comments;
	}
}
