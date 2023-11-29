import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../services/request.service';
import { Request } from '../../interfaces/request.interface';
import { ConfigService } from '../../services/config.service';

@Component({
	selector: 'admin-requests',
	templateUrl: './admin-requests.component.html',
	styleUrls: ['./admin-requests.component.scss']
})
export class AdminRequestsComponent implements OnInit {

	activeRequest: Request = {} as Request;

	isShowAnswer = false;

	tinymceContent = '';

	tinyConfig = {};

	constructor(private _rs: RequestService, public config: ConfigService) {
		this.tinyConfig = {
			...config.tinyConfig,
			height: '300px'
		}
	}

	async ngOnInit(): Promise<void> {
		await this._rs.get();
		this.activeRequest = this._rs.requests[this._rs.requests.length - 1];
	}

	get requests(): Request[] {
		return this._rs.requests;
	}

	get statuses(): string[] {
		return this._rs.statuses;
	}

	async deleteRequest(request: Request): Promise<void> {
		await this._rs.delete(request)

		this.activeRequest = {} as Request;
	}

	changeRequestStatus(request: Request): void {
		console.log(request.status);

		request.status = Number(request.status) as 0 | 1 | 2;

		this._rs.changeStatus(request);
	}

	sendAnswer(request: Request): void {
		this._rs.sendAnswer(request, this.tinymceContent);
	}

	requestStatus(status: 0 | 1 | 2): string {
		return this._rs.statuses[status ?? 0];
	}
}
