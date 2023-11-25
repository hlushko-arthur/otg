export interface NewPost {
	content: string;
	dateCreated: string;
	type: string;
}

export interface Post extends NewPost {
	_id: string;
}
