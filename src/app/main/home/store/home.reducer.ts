import { createReducer, on } from '@ngrx/store';
import * as HomeActions from './home.action';
export interface Video {
	id: number;
	title: string;
	thumbnail: string;
	uploadDate: Date;
	duration: number;
	views: number;
	url: String;
	user: User;
}
export interface User {
	id: number;
	name: string;
	imgURL: string;
}
export interface State {
	videos: Video[];
}
const initialState: State = {
	videos: [],
};
export const HomeReducer = createReducer(
	initialState,
	on(HomeActions.LoadVideos, (state, props) => ({
		...state,
		videos: [...state.videos, ...props.videos],
	}))
);
