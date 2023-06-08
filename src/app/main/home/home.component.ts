import { Component, OnInit } from '@angular/core';
import { Video } from '../store/home.reducer';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
	videos: Video[] = [];
	constructor(private store: Store<fromApp.AppState>) {}

	ngOnInit(): void {
		this.store.select('home').subscribe((homeState) => {
			this.videos = homeState.videos;
		});
	}
}
