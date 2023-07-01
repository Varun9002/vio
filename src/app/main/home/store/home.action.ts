import { createAction, props } from '@ngrx/store';
import { Video } from 'src/app/models/API_Video.model';

export const FetchVideos = createAction(
	'[Home] Fetch Videos',
	props<{ page: number }>()
);
export const LoadVideos = createAction(
	'[Home] Load Videos',
	props<{ videos: Video[]; totalVideos: number; page: number }>()
);
