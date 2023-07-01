import { createAction, props } from '@ngrx/store';

export const LoginSuccess = createAction(
	'[Auth] Authenticate Success',
	props<{
		id: string;
		name: string;
		image: string;
		token: string;
		expiresIn: Date;
		redirect: boolean;
	}>()
);
export const Logout = createAction('[Auth] Logout');

export const AuthenticateFail = createAction(
	'[Auth] Authenticate Fail',
	props<{ error: string }>()
);

export const LoginStart = createAction(
	'[Auth] Login Start',
	props<{ email: string; password: string }>()
);

export const AutoLogin = createAction('[Auth] Auto Login');

export const SignupStart = createAction(
	'[Auth] Signup Start',
	props<{
		name: string;
		email: string;
		password: string;
		confirmPassword: string;
	}>()
);

export const SignupSuccess = createAction('[Auth] SignUp Start');
