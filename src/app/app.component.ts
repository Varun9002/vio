import { Component, OnDestroy, OnInit } from '@angular/core';
import {
	NavigationCancel,
	NavigationEnd,
	NavigationError,
	NavigationStart,
	Router,
	RouterEvent,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import * as AuthActions from './auth/store/auth.actions';
import * as fromApp from './store/app.reducer';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
	title = 'vio';

	unsubscribe = new Subject<void>();
	isLoading = true;

	constructor(
		private store: Store<fromApp.AppState>,
		private router: Router
	) {
		this.router.events
			.pipe(takeUntil(this.unsubscribe))
			.subscribe((routerEvent) => {
				this.checkRouterEvent(routerEvent as RouterEvent);
			});
	}
	checkRouterEvent(routerEvent: RouterEvent): void {
		if (routerEvent instanceof NavigationStart) {
			this.isLoading = true;
		}

		if (
			routerEvent instanceof NavigationEnd ||
			routerEvent instanceof NavigationCancel ||
			routerEvent instanceof NavigationError
		) {
			this.isLoading = false;
		}
	}
	ngOnInit(): void {
		this.store.dispatch(AuthActions.AutoLogin());
	}
	ngOnDestroy(): void {
		this.unsubscribe.next();
	}
}
