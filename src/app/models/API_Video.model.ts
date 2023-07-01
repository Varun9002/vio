export interface API_Video {
	message: string;
	videos: Video[];
	total: number;
}

export interface Video {
	_id: string;
	title: string;
	views: number;
	url: string | undefined;
	description: string | undefined;
	thumbnail: string;
	duration: number;
	user: User;
	comments: Comment[] | undefined;
	createdAt: Date;
}

export interface User {
	_id: string;
	name: string;
	email: string | undefined;
	imageUrl: string | null;
}

export interface Comment {
	userId: User;
	comment: string;
}
