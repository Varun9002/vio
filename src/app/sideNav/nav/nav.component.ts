import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as AuthActions from 'src/app/auth/store/auth.actions';
import { ActiveUser } from 'src/app/auth/user.model';
import * as fromApp from 'src/app/store/app.reducer';
@Component({
	selector: 'app-nav',
	templateUrl: './nav.component.html',
	styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
	user: ActiveUser | null = null;
	displayName: string = '';
	constructor(private store: Store<fromApp.AppState>) {}

	ngOnInit(): void {
		this.store.select('auth').subscribe((authState) => {
			this.user = authState.user;
			if (this.user) {
				this.displayName = this.user!.name.split(' ')[0];
				if (this.displayName.length >= 6) {
					this.displayName = this.displayName.substring(0, 5) + '..';
				}
			}
		});
	}
	logout() {
		this.store.dispatch(AuthActions.Logout());
	}
}
