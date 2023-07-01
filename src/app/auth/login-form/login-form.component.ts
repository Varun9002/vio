import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromApp from 'src/app/store/app.reducer';
import { AuthService } from '../auth.service';
import * as AuthActions from '../store/auth.actions';

@Component({
	selector: 'app-login-form',
	templateUrl: './login-form.component.html',
	styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent implements OnInit {
	loginForm!: FormGroup;

	constructor(
		private store: Store<fromApp.AppState>,
		private authService: AuthService
	) {}

	ngOnInit(): void {
		this.loginForm = new FormGroup({
			email: new FormControl<string | null>(null, [
				Validators.email,
				Validators.required,
			]),
			password: new FormControl<string | null>(null, [
				Validators.required,
				Validators.minLength(8),
			]),
		});
	}
	onSubmit() {
		this.store.dispatch(
			AuthActions.LoginStart({
				email: this.loginForm.value.email,
				password: this.loginForm.value.password,
			})
		);
		this.loginForm.reset({ password: null });
	}
	switchMode() {
		this.authService.isLogin.next();
	}
}
