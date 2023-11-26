import { Component } from "@angular/core";
import { NewRequest } from "../../interfaces/request.interface";
import { RequestService } from "../../services/request.service";
import * as moment from "moment";
import { UserService } from "../../services/user.service";
@Component({
	templateUrl: './create-request.component.html',
	styleUrls: ['./create-request.component.scss']
})

export class CreateRequestComponent {
	request: NewRequest = {} as NewRequest;

	isRequestSent = false;

	close: () => void;

	constructor(private _rs: RequestService) { }

	get isButtonDisabled(): boolean {
		return !this.request.fullName || !this.request.email || !this.request.phone || !this.request.text || !this.request.isAgree;
	}

	async createRequest(): Promise<void> {
		console.log(1);

		this.request = {
			...this.request,
			dateCreated: moment().format('YYYY-MM-DD HH:mm')
		}
		await this._rs.create(this.request);

		this.isRequestSent = true;
	}
}