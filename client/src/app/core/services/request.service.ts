import { AlertService } from 'wacom';
import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import {
	ServerResponse,
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
			if (resp.status) {

			}
		})
	}

	async get(): Promise<Request[]> {
		await this._http.get('/api/request/get').then((resp: ServerResponse) => {
			this.requests = resp.data as Request[];
		})

		return this.requests;
	}

	async delete(request: Request): Promise<void> {
		await this._http.post('/api/request/delete', {
			_id: request._id
		}).then((resp: ServerResponse) => {
			if (resp.status) {
				const requestIndex = this.requests.findIndex((request) => request._id == request._id);

				this.requests.splice(requestIndex, 1);
			}
		})
	}

	async changeStatus(request: Request): Promise<void> {
		const newStatus = request.status === 0 ? 1 : 2;
		await this._http.post('/api/request/changeStatus', {
			_id: request._id,
			status: newStatus
		}).then((resp: ServerResponse) => {
			request.status = newStatus;
		})
	}

	async update(request: Request): Promise<void> {
		await this._http.post('/api/request/update', request).then((resp: ServerResponse) => {
			if (resp.status) {
				this._alert.success({
					text: 'Звернення успішно оновлено'
				})
			}
		})
	}
}
