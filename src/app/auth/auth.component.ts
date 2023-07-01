import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import { AuthService } from './auth.service';

@Component({
	selector: 'app-auth',
	templateUrl: './auth.component.html',
	styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
	isLogin = true;
	isLoading = false;
	hasSignedUp = false;
	errorMsg: string | null = null;
	timeout: any;
	constructor(
		private store: Store<fromApp.AppState>,
		private authService: AuthService
	) {}
	ngOnInit(): void {
		this.authService.isLogin.subscribe(() => {
			this.isLogin = !this.isLogin;
		});
		this.store.select('auth').subscribe((authState) => {
			this.hasSignedUp = authState.signupSuccess;
			this.errorMsg = authState.authError;
			this.isLoading = authState.isLoading;

			if (this.errorMsg || this.hasSignedUp) {
				if (this.timeout) {
					clearTimeout(this.timeout);
				}
				this.timeout = setTimeout(() => {
					this.hasSignedUp = false;
					this.errorMsg = null;
				}, 5000);
			}
			// console.log(authState.user);
		});
	}
}
