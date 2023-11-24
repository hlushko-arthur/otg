import { Component } from '@angular/core';
import { ButtonTypes } from 'src/app/modules/button/button.interface';
import { FormConfig, FormModules, FormService } from 'src/app/modules/form/form.service';
import { InputTypes } from 'src/app/modules/input/input.interface';
import { UserService } from 'src/app/core';
import { CoreService } from 'wacom';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
	readonly buttonTypes = ButtonTypes;

	readonly inputTypes = InputTypes;

	formPassword: FormConfig = {
		title: 'Change password',
		components: [
			{
				module: FormModules.INPUT,
				type: InputTypes.PASSWORD,
				placeholder: 'Type password',
				label: 'Current',
				input: 'oldPass',
				focused: true
			},
			{
				module: FormModules.INPUT,
				type: InputTypes.PASSWORD,
				placeholder: 'Type password',
				label: 'New',
				input: 'newPass'
			},
			{
				module: FormModules.BUTTON,
				type: ButtonTypes.PRIMARY,
				label: 'Change'
			}
		]
	}

	formProfile: FormConfig = {
		components: [
			{
				set: this.us.user.name,
				module: FormModules.INPUT,
				placeholder: 'fill your name',
				label: 'Name',
				input: 'name'
			},
			{
				set: this.us.user.data['phone'],
				module: FormModules.INPUT,
				placeholder: 'fill your phone',
				label: 'Phone',
				input: 'phone'
			},
			{
				set: this.us.user.data['bio'],
				module: FormModules.INPUT,
				type: InputTypes.TEXTAREA,
				placeholder: 'fill your bio',
				label: 'Biography',
				input: 'bio'
			}
		]
	};

	showForm = false;

	update(data: any): void {
		this.us.user.name = data.name;

		this.us.user.data['phone'] = data.phone;

		this.us.user.data['bio'] = data.bio;

		this.us.update();
	}

	constructor(
		private _form: FormService,
		private _core: CoreService,
		public us: UserService
	) {
		this._core.next('us.user', ()=>{
			this.formProfile.components[0].set = this.us.user.name;

			this.formProfile.components[1].set = this.us.user.data['phone'];

			this.formProfile.components[2].set = this.us.user.data['bio'];

			this.showForm = true;
		});
	}

	change_password(): void {
		this._form.modal(this.formPassword, form => {
			this.us.change_password(form.oldPass, form.newPass)
		});
	}
}
