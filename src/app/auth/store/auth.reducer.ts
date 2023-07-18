import { createReducer, on } from '@ngrx/store';
import { ActiveUser } from '../user.model';
import * as AuthActions from './auth.actions';

export interface State {
	user: ActiveUser | null;
	isLoading: boolean;
	signupSuccess: boolean;
	authError: string | null;
}

const initialState: State = {
	user: null,
	isLoading: false,
	signupSuccess: false,
	authError: null,
};
export const AuthReducer = createReducer(
	initialState,
	on(AuthActions.LoginSuccess, (state, action) => ({
		...state,
		user: new ActiveUser(
			action.id,
			action.name,
			action.image,
			action.token,
			action.expiresIn
		),
		signupSuccess: false,
		isLoading: false,
		authError: null,
	})),
	on(AuthActions.Logout, (state) => ({ ...state, user: null })),
	on(AuthActions.LoginStart, (state, action) => ({
		...state,
		isLoading: true,
		signupSuccess: false,
		authError: null,
	})),
	on(AuthActions.AuthenticateFail, (state, action) => ({
		...state,
		user: null,
		isLoading: false,
		signupSuccess: false,
		authError: action.error,
	})),
	on(AuthActions.SignupStart, (state, action) => ({
		...state,
		isLoading: true,
		signupSuccess: false,
		authError: null,
	})),
	on(AuthActions.SignupSuccess, (state, action) => ({
		...state,
		signupSuccess: true,
		isLoading: false,
		authError: null,
	})),
	on(AuthActions.UpdateUser, (state, action) => ({
		...state,
		user: new ActiveUser(
			state.user!.id,
			action.name,
			action.imageUrl,
			state.user!.token!,
			state.user!.tokenExpDate!
		),
	}))
);
