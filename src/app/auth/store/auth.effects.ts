import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../user.model';
import * as AuthActions from './auth.actions';
@Injectable()
export class AuthEffects {
	constructor(
		private actions$: Actions,
		private http: HttpClient,
		private router: Router
	) {}
	authLogin = createEffect(() =>
		this.actions$.pipe(
			ofType(AuthActions.LoginStart),
			switchMap((authData) => {
				console.log('Before HTTP call');

				return this.http
					.post<{
						id: string;
						name: string;
						image: string;
						token: string;
						expiresIn: Date;
					}>(environment.API_URL + '/auth/login', {
						email: authData.email,
						password: authData.password,
					})
					.pipe(
						// tap((resData) => {
						// 	this.authService.setLogiutTimer(
						// 		+resData.expiresIn * 1000
						// 	);
						// }),
						map((resData) => {
							localStorage.setItem(
								'loggedInUser',
								JSON.stringify(
									new User(
										resData.id,
										resData.name,
										resData.image,
										resData.token,
										resData.expiresIn
									)
								)
							);

							return AuthActions.LoginSuccess({
								id: resData.id,
								name: resData.name,
								image: resData.image,
								token: resData.token,
								expiresIn: resData.expiresIn,
							});
						}),
						catchError((errorRes: HttpErrorResponse) => {
							console.log(errorRes);
							return of(
								AuthActions.AuthenticateFail({
									error: 'Login Failed',
								})
							);
						})
					);
			})
		)
	);
	authSignup$ = createEffect(() =>
		this.actions$.pipe(
			ofType(AuthActions.SignupStart),
			switchMap((authData) => {
				return this.http
					.put<{ message: string; userId: string }>(
						environment.API_URL + '/auth/login',
						{
							email: authData.email,
							name: authData.name,
							password: authData.password,
							confirmPassword: authData.confirmPassword,
						}
					)
					.pipe(
						map((resData) => {
							return AuthActions.SignupSuccess();
						})
					);
			})
		)
	);
	authRedirect$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(AuthActions.LoginSuccess),
				tap((authData) => {
					this.router.navigate(['/']);
				})
			),
		{ dispatch: false }
	);
}
