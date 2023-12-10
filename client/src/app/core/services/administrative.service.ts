import { AlertService } from 'wacom';
import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { ServerResponse } from '../interfaces/server.interface';
import {
	NewAdministrativeService,
	IAdministrativeService
} from '../interfaces/administrativeService.interface';

@Injectable({
	providedIn: 'root'
})
export class AdministrativeService {
	administrativeServices: IAdministrativeService[] = [];

	statuses = ['Новий', 'На розгляді', 'Завершений'];

	constructor(private _alert: AlertService, private _http: HttpService) {}

	async create(
		administrativeService: NewAdministrativeService
	): Promise<void> {
		await this._http
			.post('/api/administrativeService/create', administrativeService)
			.then((resp: ServerResponse) => {
				if (!resp.status) {
					this._handleError(resp.message as string);

					return;
				}
			});
	}

	async get(): Promise<IAdministrativeService[]> {
		await this._http
			.get('/api/administrativeService/get')
			.then((resp: ServerResponse) => {
				if (!resp.status) {
					this._handleError(resp.message as string);

					return;
				}

				this.administrativeServices =
					resp.data as IAdministrativeService[];
			});

		return this.administrativeServices;
	}

	async delete(administrativeService: IAdministrativeService): Promise<void> {
		await this._http
			.post('/api/administrativeService/delete', {
				_id: administrativeService._id
			})
			.then((resp: ServerResponse) => {
				if (!resp.status) {
					this._handleError(resp.message as string);

					return;
				}

				const administrativeServiceIndex =
					this.administrativeServices.findIndex(
						(_administrativeService) =>
							_administrativeService._id ==
							administrativeService._id
					);

				this.administrativeServices.splice(
					administrativeServiceIndex,
					1
				);
			});
	}

	async changeStatus(
		administrativeService: IAdministrativeService
	): Promise<void> {
		await this._http
			.post('/api/administrativeService/changeStatus', {
				_id: administrativeService._id,
				status: administrativeService.status
			})
			.then((resp: ServerResponse) => {
				if (!resp.status) {
					this._handleError(resp.message as string);

					return;
				}
			});
	}

	async sendAnswer(
		administrativeService: IAdministrativeService,
		answer: string
	): Promise<void> {
		await this._http
			.post('/api/administrativeService/sendAnswer', {
				_id: administrativeService._id,
				email: administrativeService.email,
				answer: answer
			})
			.then((resp: ServerResponse) => {
				if (!resp.status) {
					this._handleError(resp.message as string);

					return;
				}

				administrativeService.answer = answer;
			});
	}

	async update(administrativeService: IAdministrativeService): Promise<void> {
		await this._http
			.post('/api/administrativeService/update', administrativeService)
			.then((resp: ServerResponse) => {
				if (!resp.status) {
					this._handleError(resp.message as string);

					return;
				}

				this._alert.success({
					text: 'Звернення успішно оновлено'
				});
			});
	}

	private _handleError(err: string): void {
		this._alert.destroy();

		this._alert.warning({
			text: `Щось пішло не так. ${err}`
		});
	}
}
