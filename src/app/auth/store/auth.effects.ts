import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth.service';
import { ActiveUser } from '../user.model';
import * as AuthActions from './auth.actions';
@Injectable()
export class AuthEffects {
	constructor(
		private actions$: Actions,
		private http: HttpClient,
		private router: Router,
		private authService: AuthService
	) {}
	authLogin = createEffect(() =>
		this.actions$.pipe(
			ofType(AuthActions.LoginStart),
			switchMap((authData) => {
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
						tap((resData) => {
							resData.expiresIn = new Date(resData.expiresIn);
							this.authService.setLogiutTimer(
								resData.expiresIn.valueOf() - Date.now()
							);
						}),
						map((resData) => {
							localStorage.setItem(
								'loggedInUser',
								JSON.stringify(
									new ActiveUser(
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
								image:
									environment.API_URL + '/' + resData.image,
								token: resData.token,
								expiresIn: resData.expiresIn,
								redirect: true,
							});
						}),
						catchError((errorRes: HttpErrorResponse) => {
							console.log(errorRes);
							return of(
								AuthActions.AuthenticateFail({
									error:
										errorRes.error.message ||
										'Unable to connect to server',
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
						environment.API_URL + '/auth/signup',
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
						}),
						catchError((errorRes: HttpErrorResponse) => {
							console.log(errorRes);
							return of(
								AuthActions.AuthenticateFail({
									error:
										errorRes.error.message ||
										'Unable to connect to server',
								})
							);
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
					if (authData.redirect) this.router.navigate(['/']);
				})
			),
		{ dispatch: false }
	);
	authLogout$ = createEffect(
		() => {
			return this.actions$.pipe(
				ofType(AuthActions.Logout),
				tap(() => {
					this.authService.clearLogoutTimer();
					localStorage.removeItem('loggedInUser');
					this.router.navigate(['/auth']);
				})
			);
		},
		{ dispatch: false }
	);
	authAutoLogin$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(AuthActions.AutoLogin),
			map(() => {
				console.log('In Autologin');

				const jsonUser = localStorage.getItem('loggedInUser');
				if (!jsonUser) {
					return { type: 'dummy' };
				}
				const userData: {
					id: string;
					name: string;
					image: string | null;
					_token: string;
					_tokenExpirationDate: string;
				} = JSON.parse(jsonUser);
				const loadedUser: ActiveUser = new ActiveUser(
					userData.id,
					userData.name,
					userData.image,
					userData._token,
					new Date(userData._tokenExpirationDate)
				);
				if (loadedUser.token) {
					const expDuration =
						new Date(userData._tokenExpirationDate).getTime() -
						new Date().getTime();
					this.authService.setLogiutTimer(expDuration);
					return AuthActions.LoginSuccess({
						id: loadedUser.id,
						name: loadedUser.name,
						image: environment.API_URL + '/' + loadedUser.image,
						token: loadedUser.token,
						expiresIn: new Date(userData._tokenExpirationDate),
						redirect: false,
					});
				}
				return { type: 'dummy' };
			})
		);
	});
}
