export interface NewRequest {
	fullName: string;
	email: string;
	phone: string;
	text: string;
	isAgree: boolean;
	dateCreated: string;
}

export interface Request extends NewRequest {
	_id: string;
	answer: string;
	status: 0 | 1 | 2;
}