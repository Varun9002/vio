import * as fromHome from '../main/store/home.reducer';

export interface AppState {
	home: fromHome.State;
}
export const appReducers = {
	home: fromHome.HomeReducer,
};
