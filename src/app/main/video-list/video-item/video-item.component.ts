import { Component, Input, OnInit } from '@angular/core';
import { Video } from '../../home/store/home.reducer';

@Component({
	selector: 'app-video-item',
	templateUrl: './video-item.component.html',
	styleUrls: ['./video-item.component.css'],
})
export class VideoItemComponent implements OnInit {
	@Input() video!: Video;
	constructor() {}

	ngOnInit(): void {}
}
