import { Component, Input, OnInit } from '@angular/core';
import { Comment } from 'src/app/models/API_Video.model';

@Component({
	selector: 'app-comment',
	templateUrl: './comment.component.html',
	styleUrls: ['./comment.component.css'],
})
export class CommentComponent implements OnInit {
	@Input() comment!: Comment;
	metric = '';
	constructor() {}

	ngOnInit(): void {
		let count = 0;
		console.log(!isNaN(this.comment.cmntDate.valueOf()));
		if (!isNaN(this.comment.cmntDate.valueOf()))
			count =
				Math.floor(Date.now() - this.comment.cmntDate.valueOf()) / 1000;

		if (count < 60) {
			this.metric = 'now';
		} else if (count < 3600) {
			count /= 60;
			this.metric = Math.floor(count) + ' minutes ago';
		} else if (count < 86400) {
			count /= 3600;
			this.metric = Math.floor(count) + ' hours ago';
		} else if (count < 2592000) {
			count /= 86400;
			this.metric = Math.floor(count) + ' days ago';
		} else if (count < 31104000) {
			count /= 2592000;
			this.metric = Math.floor(count) + ' months ago';
		} else {
			count /= 31104000;
			this.metric = Math.floor(count) + ' years ago';
		}
	}
}
