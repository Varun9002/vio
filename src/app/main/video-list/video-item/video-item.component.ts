import { Component, Input, OnInit } from '@angular/core';
import { Video } from 'src/app/models/API_Video.model';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-video-item',
	templateUrl: './video-item.component.html',
	styleUrls: ['./video-item.component.css'],
})
export class VideoItemComponent implements OnInit {
	@Input() video!: Video;
	API_URL = environment.API_URL + '/';
	constructor() {}

	ngOnInit(): void {}
}
