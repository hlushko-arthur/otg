import { Component } from '@angular/core';
import { NewUser } from 'src/app/core/interfaces/user.interface';
import { UserService } from 'src/app/core/services/user.service';
import { AlertService } from 'wacom';

@Component({
	templateUrl: './sign.component.html',
	styleUrls: ['./sign.component.scss']
})
export class SignComponent {
	isLogin = true;

	isRecoverPassword = false;

	isErr: { [key: string]: boolean } = {};

	user: NewUser = {} as NewUser;
	constructor(private _us: UserService, private _alert: AlertService) { }

	submitLogin(): void {
		this._us.login(this.user);
	}

	submitSignup(): void {
		this._us.signup(this.user);
	}

	recoverPassword(): void {
		if (!this.user.login) {
			this._alert.warning({
				text: 'Введіть Ваш email'
			})

			this.isErr['login'] = true;

			return;
		} else {
			this.isRecoverPassword = true;

			this._us.resetPassword(this.user.login);

			this._alert.show({
				text: 'Код було надіслано на Ваш email'
			})
		}
	}

	async submitRecoverPassword(): Promise<void> {
		const isPinCorrect = await this._us.checkResetPin(this.user.login, this.user.resetPin as string);

		if (isPinCorrect) {
			await this._us.changePassword(this.user.login, this.user.password);
			this._us.login(this.user);
		} else {
			this._alert.error({
				text: 'Неправильний код'
			})
		}
	}

	validateEmail(): boolean {
		if (!this.user.login) {
			return false;
		}
		const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

		return !emailRegex.test(this.user.login);
	}
}
