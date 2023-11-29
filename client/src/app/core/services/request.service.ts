import { AlertService } from 'wacom';
import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import {
	ServerResponse, ServerResponseError,
} from '../interfaces/server.interface';
import { NewRequest, Request } from '../interfaces/request.interface';

@Injectable({
	providedIn: 'root'
})
export class RequestService {

	requests: Request[] = [];

	statuses = ['Новий', 'На розгляді', 'Завершений']

	constructor(
		private _alert: AlertService,
		private _http: HttpService
	) {

	}

	async create(request: NewRequest): Promise<void> {
		await this._http.post('/api/request/create', request).then((resp: ServerResponse) => {
			if (!resp.status) {
				this._handleError(resp.message as string);
				return;
			}
		})
	}

	async get(): Promise<Request[]> {
		await this._http.get('/api/request/get').then((resp: ServerResponse) => {
			if (!resp.status) {
				this._handleError(resp.message as string);
				return;
			}

			this.requests = resp.data as Request[];
		})

		return this.requests;
	}

	async delete(request: Request): Promise<void> {
		await this._http.post('/api/request/delete', {
			_id: request._id
		}).then((resp: ServerResponse) => {
			if (!resp.status) {
				this._handleError(resp.message as string);
				return;
			}

			const requestIndex = this.requests.findIndex((request) => request._id == request._id);

			this.requests.splice(requestIndex, 1);
		})
	}

	async changeStatus(request: Request): Promise<void> {
		await this._http.post('/api/request/changeStatus', {
			_id: request._id,
			status: request.status
		}).then((resp: ServerResponse) => {
			if (!resp.status) {
				this._handleError(resp.message as string);
				return;
			}
		})
	}

	async sendAnswer(request: Request, answer: string): Promise<void> {
		await this._http.post('/api/request/sendAnswer', {
			_id: request._id,
			email: request.email,
			answer: answer
		}).then((resp: ServerResponse) => {
			if (!resp.status) {
				this._handleError(resp.message as string);
				return;
			}
			request.answer = answer;
		})
	}

	async update(request: Request): Promise<void> {
		await this._http.post('/api/request/update', request).then((resp: ServerResponse) => {
			if (!resp.status) {
				this._handleError(resp.message as string);
				return;
			}
			this._alert.success({
				text: 'Звернення успішно оновлено'
			})
		})
	}

	private _handleError(err: string): void {
		this._alert.destroy();

		this._alert.warning({
			text: `Щось пішло не так. ${err}`
		});
	}
}
