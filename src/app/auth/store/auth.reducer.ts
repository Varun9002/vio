import { createReducer, on } from '@ngrx/store';
import { User } from '../user.model';
import * as AuthActions from './auth.actions';

export interface State {
	user: User | null;
	isLoading: boolean;
	signupSucess: boolean;
	authError: string | null;
}

const initialState: State = {
	user: null,
	isLoading: false,
	signupSucess: false,
	authError: null,
};
export const AuthReducer = createReducer(
	initialState,
	on(AuthActions.LoginSuccess, (state, action) => ({
		...state,
		user: new User(
			action.id,
			action.name,
			action.image,
			action.token,
			action.expiresIn
		),
		isLoading: false,
		authError: null,
	})),
	on(AuthActions.Logout, (state) => ({ ...state, user: null })),
	on(AuthActions.LoginStart, (state, action) => ({
		...state,
		isLoading: true,
		authError: null,
	})),
	on(AuthActions.AuthenticateFail, (state, action) => ({
		...state,
		user: null,
		isLoading: false,
		authError: action.error,
	})),
	on(AuthActions.SignupStart, (state, action) => ({
		...state,
		isLoading: true,
		authError: null,
	})),
	on(AuthActions.SignupSuccess, (state, action) => ({
		...state,
		signupSuccess: true,
	})),
	on(AuthActions.ClearError, (state) => ({ ...state, authError: null }))
);
