import { createReducer, on } from '@ngrx/store';
import { Video } from 'src/app/models/API_Video.model';
import * as HomeActions from './home.action';

export interface State {
	isLoading: boolean;
	videos: Video[];
	loadedPage: number;
	totalVideos: number;
}
const initialState: State = {
	isLoading: false,
	videos: [],
	loadedPage: 0,
	totalVideos: 1,
};
export const HomeReducer = createReducer(
	initialState,
	on(HomeActions.FetchVideos, (state, props) => ({
		...state,
		isLoading: true,
	})),
	on(HomeActions.LoadVideos, (state, props) => ({
		...state,
		videos: [...state.videos, ...props.videos],
		totalVideos: props.totalVideos,
		loadedPage: props.page,
		isLoading: false,
	}))
);
