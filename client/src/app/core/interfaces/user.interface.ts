export interface NewUser {
	login: string;
	password: string;
	admin: boolean;
	resetPin: string;
}

export interface User extends Omit<NewUser, 'password' | 'resetPin'> {
	_id: string;
}
