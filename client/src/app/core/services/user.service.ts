import { AlertService } from 'wacom';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { HttpService } from './http.service';
import {
	ServerResponse,
	ServerResponseError
} from '../interfaces/server.interface';

@Injectable({
	providedIn: 'root'
})
export class UserService {
	user: User = {
		admin: false
	} as User;

	users: User[] = [];

	// _users:  = {};

	constructor(
		private _alert: AlertService,
		private _router: Router,
		private _http: HttpService
	) {
		this.user = JSON.parse(
			(localStorage.getItem('user') as string) || '{}'
		);
	}

	async fetch(_id: string): Promise<User> {
		let user = {} as User;

		await this._http
			.get(`/api/user/fetch/${_id}`)
			.then((resp: ServerResponse) => {
				user = resp.data as User;
			});

		return user;
	}

	signup(payload: object): void {
		this._http.post('/api/user/sign', payload).then((resp: ServerResponse) => {
			if (!resp.status) {
				this._alert.error({
					text: 'Цей email вже використовується'
				});
			} else {
				this._setAuthorizedUser(resp.data as User & { token: string });
			}
		});
	}

	login(payload: object): void {
		this._http.post('/api/user/login', payload).then((resp: ServerResponse) => {
			if (!resp.status) {
				this._alert.warning({
					text: 'Пароль або емейл введено невірно'
				});
			} else {
				this._setAuthorizedUser(resp.data as User & { token: string });
			}
		});
	}

	update(user: User): void {
		this._alert.destroy();

		this._alert.info({
			text: 'Profile is updating...'
		});

		this._http
			.post('/api/user/update', user)
			.then((resp: ServerResponse | ServerResponseError) => {
				if (resp.status) {
					this._alert.destroy();

					this._alert.success({
						text: 'Profile has been succesfully updated'
					});
				} else {
					this._handleError(resp as ServerResponseError);
				}
			})
			.catch(this._handleError);
	}

	resetPassword(login: string): void {
		this._http
			.post('/api/user/resetPassword', {
				login
			})
			.then(
				(resp) => {
					if (resp) {
						this._alert.info({
							text: `Код надісланий на пошту ${login}`
						});
					}
				},
				() => {
					this._alert.error({
						text: 'Щось пішло не так, спробуйте пізніше'
					});
				}
			);
	}

	async checkResetPin(login: string, resetPin: string): Promise<boolean> {
		return await this._http
			.post('/api/user/checkResetPin', {
				login,
				resetPin
			})
			.then((resp: ServerResponse) => {
				return resp.status as boolean;
			})
			.catch(() => {
				return false;
			});
	}

	async changePassword(login: string, password: string): Promise<boolean> {
		return await this._http
			.post('/api/user/changePassword', {
				login,
				password
			})
			.then((resp: ServerResponse) => {
				return resp.status as boolean;
			})
			.catch(() => {
				return false;
			});
	}

	logout(): void {
		localStorage.removeItem('user');

		this.user = {} as User;
	}

	private _setAuthorizedUser(user: User & { token?: string }): void {
		const cookieValue = `Authorization=${user.token as string}; path=/`;

		document.cookie = cookieValue;

		delete user.token;

		this.user = user;

		localStorage.setItem('user', JSON.stringify(user));

		this._router.navigateByUrl('/');
	}

	private _handleError(err: { message: string }): void {
		this._alert.destroy();

		this._alert.warning({
			text: `Something went wrong. ${err.message}`
		});
	}
}
