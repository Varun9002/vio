import { Component, OnInit } from '@angular/core';
import {
	AbstractControl,
	FormControl,
	FormGroup,
	ValidationErrors,
	Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromApp from 'src/app/store/app.reducer';
import { AuthService } from '../auth.service';
import * as AuthActions from '../store/auth.actions';

@Component({
	selector: 'app-signup-form',
	templateUrl: './signup-form.component.html',
	styleUrls: ['./signup-form.component.css'],
})
export class SignupFormComponent implements OnInit {
	signupForm!: FormGroup;

	constructor(
		private store: Store<fromApp.AppState>,
		private authService: AuthService
	) {}

	ngOnInit(): void {
		this.signupForm = new FormGroup({
			name: new FormControl<string | null>(null, [
				Validators.required,
				Validators.minLength(3),
			]),
			email: new FormControl<string | null>(null, [
				Validators.email,
				Validators.required,
			]),
			password: new FormControl<string | null>(null, [
				Validators.required,
				Validators.minLength(8),
			]),
			confirmPassword: new FormControl<string | null>(
				null,
				this.confirmValidator.bind(this)
			),
		});
	}

	onSubmit() {
		this.store.dispatch(
			AuthActions.SignupStart({
				email: this.signupForm.value.email,
				name: this.signupForm.value.name,
				password: this.signupForm.value.password,
				confirmPassword: this.signupForm.value.confirmPassword,
			})
		);
		this.signupForm.reset();
		this.authService.isLogin.next();
	}
	switchMode() {
		this.authService.isLogin.next();
	}
	confirmValidator(control: AbstractControl): ValidationErrors | null {
		if (this.signupForm) {
			const passwordControl = this.signupForm.get('password');
			if (passwordControl) {
				return control.value !== passwordControl.value
					? { misMatch: true }
					: null;
			}
		}
		return { misMatch: true };
	}
}
