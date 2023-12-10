export interface NewAdministrativeService {
	fullName: string;
	email: string;
	phone: string;
	text: string;
	isAgree: boolean;
	dateCreated: string;
	birthday: string;
}

export interface IAdministrativeService extends NewAdministrativeService {
	_id: string;
	answer: string;
	status: 0 | 1 | 2;
	extract: boolean;
}
