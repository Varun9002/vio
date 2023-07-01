import { Component, Input, OnInit } from '@angular/core';
import { Video } from 'src/app/models/API_Video.model';
import { VideoListService } from './video-list.service';

@Component({
	selector: 'app-video-list',
	templateUrl: './video-list.component.html',
	styleUrls: ['./video-list.component.css'],
})
export class VideoListComponent implements OnInit {
	@Input() videos!: Video[];

	@Input() lastPage = false;
	constructor(private videoListService: VideoListService) {}
	onLoadMore() {
		this.videoListService.loadMore.next();
	}
	ngOnInit(): void {}
}
