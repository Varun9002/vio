import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-video-player',
	templateUrl: './video-player.component.html',
	styleUrls: ['./video-player.component.css'],
})
export class VideoPlayerComponent implements OnInit {
	showComments = true;
	toggleComments(comments: boolean) {
		this.showComments = comments;
	}
	constructor() {}

	ngOnInit(): void {}
}
