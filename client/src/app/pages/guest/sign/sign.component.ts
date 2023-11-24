import { Component, ViewChild, ElementRef } from '@angular/core';
import {
	FormConfig,
	FormModules
} from 'src/app/modules/form/form.service';
import { HashService, HttpService, AlertService, UiService } from 'wacom';
import { Renderer2 } from '@angular/core';
import { StoreService } from 'wacom';
import { UserService } from 'src/app/core';
import { Router } from '@angular/router';
import { User } from 'src/app/core';
import { InputTypes } from 'src/app/modules/input/input.interface';
import { ButtonTypes } from 'src/app/modules/button/button.interface';

interface RespStatus {
	email: string;
	pass: string;
}
interface Form {
	email: string;
	password: string;
	code: string;
}

@Component({
	templateUrl: './sign.component.html',
	styleUrls: ['./sign.component.scss']
})
export class SignComponent {
	mode = '';

	formConfig: FormConfig = {
		title: 'Sign In / Sign Up',
		components: [
			{
				set: 'ceo@webart.work',
				module: FormModules.INPUT,
				type: InputTypes.EMAIL,
				placeholder: 'fill your email',
				label: 'E-mail',
				input: 'email',
				focused: true
			},
			{
				set: 'asdasdasdasd',
				module: FormModules.INPUT,
				type: InputTypes.PASSWORD,
				placeholder: 'fill your password',
				label: 'Password',
				input: 'password'
			},
			{
				module: FormModules.INPUT,
				placeholder: 'fill code from email',
				hidden: true,
				label: 'Code',
				input: 'code'
			},
			{
				module: FormModules.BUTTON,
				type: ButtonTypes.PRIMARY,
				label: "Let's go"
			}
		]
	};

	constructor(
		private alert: AlertService,
		private http: HttpService,
		private hash: HashService,
		private us: UserService,
		private router: Router,
		private renderer: Renderer2,
		private store: StoreService,
		public ui: UiService
	) {
		this.store.get('mode', (mode: string) => {
			if (mode) {
				this.mode = mode;

				this.renderer.addClass(document.body.parentNode, mode);
			}
		});
	 }

	submit(form: Form): void {
		if (!this.formConfig.components[2].hidden && form.code) {
			return this.save();
		}

		if (!form.email) {
			this.alert.error({
				text: 'Enter your email'
			});

			return;
			//return this.email_focus();
		}

		if (!this.ui.valid(form.email)) {
			this.alert.error({
				text: 'Enter proper email'
			});

			return;
			//return this.email_focus();
		}

		this.hash.set('email', form.email);

		if (!form.password) {
			this.alert.error({
				text: 'Enter your password'
			});

			return;
			// return this.password_focus();
		}

		this.http.post('/api/user/status', form, (resp: RespStatus) => {
			if (resp.email && resp.pass) {
				this.login(form);
			} else if (resp.email) {
				this.reset(form);
			} else {
				this.sign(form);
			}
		});
	}

	login(user: Form): void {
		this.http.post('/api/user/login', user, this._set.bind(this));
	}

	sign(user: Form): void {
		this.http.post('/api/user/sign', user, this._set.bind(this));
	}

	reset(user: Form): void {
		this.http.post('/api/user/request', user, () => {
			this.formConfig.components[2].hidden = false;
		});

		this.alert.info({
			text: 'Mail will sent to your email'
		});
	}

	save(): void {
		// this.http.post('/api/user/change', this.user, (resp: boolean) => {
		// 	if (resp) {
		// 		this.alert.info({
		// 			text: 'Password successfully changed'
		// 		});
		// 	} else {
		// 		this.alert.error({
		// 			text: 'Wrong Code'
		// 		});
		// 	}

		// 	this.login();
		// });
	}

	private _set = (user: User): void => {
		if (!user) {
			return this.alert.error({
				text: 'Something went wrong'
			});
		}

		localStorage.setItem('waw_user', JSON.stringify(user));

		this.http.set('token', user.token);

		this.us.user = user;

		this.us.load();

		this.router.navigate(['/profile']);
	}



	set(mode = ''): void {
		if (mode) {
			this.store.set('mode', mode);

			this.renderer.addClass(document.body.parentNode, mode);
		} else {
			this.store.remove('mode');

			this.renderer.removeClass(document.body.parentNode, 'dark');
		}

		this.mode = mode;
	}
}
