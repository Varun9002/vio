import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import { AuthService } from './auth.service';
import * as AuthActions from './store/auth.actions';

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

	signupForm!: FormGroup;
	constructor(
		private store: Store<fromApp.AppState>,
		private authService: AuthService
	) {}
	ngOnInit(): void {
		this.authService.isLogin.subscribe(() => {
			this.isLogin = !this.isLogin;
		});
		this.store.select('auth').subscribe((authState) => {
			this.hasSignedUp = authState.signupSucess;
			this.errorMsg = authState.authError;
			this.isLoading = authState.isLoading;
			console.log(authState.user);
		});
	}
	onSignup() {
		console.log('Login clicked');
		this.store.dispatch(
			AuthActions.LoginStart({
				email: 'test@test.com',
				password: 'testloll',
			})
		);
	}
}
