import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs';
import { User, Video } from 'src/app/models/API_Video.model';
import * as fromApp from 'src/app/store/app.reducer';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-video-player',
	templateUrl: './video-player.component.html',
	styleUrls: ['./video-player.component.css'],
})
export class VideoPlayerComponent implements OnInit {
	showComments = false;
	id!: string;
	video!: Video;
	API_URL = environment.API_URL + '/';
	commentForm!: FormGroup;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private http: HttpClient,
		private store: Store<fromApp.AppState>
	) {}

	ngOnInit() {
		this.route.params.subscribe((params: Params) => {
			this.id = params['vid_id'];
		});
		this.route.data.pipe(map(({ data }) => data)).subscribe((video) => {
			this.video = video;
		});
		this.commentForm = new FormGroup({
			comment: new FormControl<string | null>(null, [
				Validators.required,
			]),
		});
	}
	postComment() {
		const comt = this.commentForm.value.comment;
		this.http
			.post<{ message: string }>(
				this.API_URL + 'video/' + this.id + '/comment',
				{
					comment: this.commentForm.value.comment,
				}
			)
			.pipe(
				switchMap((resData) => {
					return this.store.select('auth');
				}),
				map((authData) => {
					const id = authData.user!.id;
					const name = authData.user!.name;
					this.video.comments?.push({
						userId: <User>{ _id: id, name: name },
						comment: comt,
						cmntDate: new Date(),
					});
				})
			)
			.subscribe(() => {
				this.commentForm.reset();
			});
	}

	toggleComments(comments: boolean) {
		this.showComments = comments;
	}
}
