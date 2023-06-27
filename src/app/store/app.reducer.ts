import * as fromAuth from '../auth/store/auth.reducer';
import * as fromHome from '../main/home/store/home.reducer';

export interface AppState {
	home: fromHome.State;
	auth: fromAuth.State;
}
export const appReducers = {
	home: fromHome.HomeReducer,
	auth: fromAuth.AuthReducer,
};
