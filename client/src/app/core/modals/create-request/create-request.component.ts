import { Component } from "@angular/core";

export interface Request {
	fullName: string;
	email: string;
	phone: string;
	text: string;
	isAgree: boolean;
}


@Component({
	templateUrl: './create-request.component.html',
	styleUrls: ['./create-request.component.scss']
})

export class CreateRequestComponent {
	request: Request = {} as Request;

	get isButtonDisabled(): boolean {
		return !this.request.fullName || !this.request.email || !this.request.phone || !this.request.text || !this.request.isAgree;
	}
}