import { createAction, props } from '@ngrx/store';
import { Video } from './home.reducer';

export const FetchVideos = createAction('[Home] Fetch Videos');
export const LoadVideos = createAction(
	'[Home] Load Videos',
	props<{ videos: Video[] }>()
);
