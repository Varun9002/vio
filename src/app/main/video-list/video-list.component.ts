import { Component, OnInit, Input } from '@angular/core';
import { Video } from '../store/home.reducer';

@Component({
	selector: 'app-video-list',
	templateUrl: './video-list.component.html',
	styleUrls: ['./video-list.component.css'],
})
export class VideoListComponent implements OnInit {
	@Input() videos!: Video[];
	// [
	// 	{
	// 		id: 1,
	// 		title: 'iPhone 9',
	// 		views: 94,
	// 		uploadDate: new Date(1679665344904),
	// 		ownerId: 1,
	// 		ownerName: 'Apple',
	// 		thumbnail: 'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
	// 		ownerImg: 'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
	// 	},
	// 	{
	// 		id: 2,
	// 		title: 'iPhone X',
	// 		views: 34,
	// 		uploadDate: new Date(1679664480904),
	// 		ownerId: 1,
	// 		ownerName: 'Apple',
	// 		thumbnail: 'https://i.dummyjson.com/data/products/2/thumbnail.jpg',
	// 		ownerImg: 'https://i.dummyjson.com/data/products/2/3.jpg',
	// 	},
	// 	{
	// 		id: 3,
	// 		title: 'Samsung Universe 9',
	// 		views: 36,
	// 		uploadDate: new Date(1679663616904),
	// 		ownerId: 2,
	// 		ownerName: 'Samsung',
	// 		thumbnail: 'https://i.dummyjson.com/data/products/3/thumbnail.jpg',
	// 		ownerImg: ['https://i.dummyjson.com/data/products/3/1.jpg'],
	// 	},
	// 	{
	// 		id: 4,
	// 		title: 'OPPOF19',
	// 		views: 123,
	// 		uploadDate: new Date(1679662752904),
	// 		ownerId: 3,
	// 		ownerName: 'OPPO',
	// 		thumbnail: 'https://i.dummyjson.com/data/products/4/thumbnail.jpg',
	// 		ownerImg: 'https://i.dummyjson.com/data/products/4/3.jpg',
	// 	},
	// 	{
	// 		id: 5,
	// 		title: 'Huawei P30',
	// 		views: 32,
	// 		ownerName: 'Huawei',
	// 		uploadDate: new Date(1679661888904),
	// 		ownerId: 4,
	// 		thumbnail: 'https://i.dummyjson.com/data/products/5/thumbnail.jpg',
	// 		ownerImg: 'https://i.dummyjson.com/data/products/5/3.jpg',
	// 	},
	// ];

	constructor() {}

	ngOnInit(): void {}
}
