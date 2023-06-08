import {
	ActivatedRouteSnapshot,
	Resolve,
	RouterStateSnapshot,
} from '@angular/router';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import * as fromApp from '../../store/app.reducer';
import * as HomeActions from '../store/home.action';
import { map, switchMap, take } from 'rxjs';
@Injectable({
	providedIn: 'root',
})
export class HomeResolverService implements Resolve<any> {
	constructor(
		private store: Store<fromApp.AppState>,
		private actions$: Actions
	) {}
	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		console.log('In Resolver');

		return this.store.select('home').pipe(
			take(1),
			map((home) => {
				return home.videos;
			}),
			switchMap((videos) => {
				if (videos.length === 0) {
					this.store.dispatch(HomeActions.FetchVideos());
					return this.actions$.pipe(
						ofType(HomeActions.LoadVideos),
						take(1)
					);
				}
				return videos;
			})
		);
	}
}
