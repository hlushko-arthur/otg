import { Component } from '@angular/core';
import { User } from 'src/app/core';
import { InputTypes } from 'src/app/modules/input/input.interface';
import { UserService } from 'src/app/core';
import { FormConfig, FormModules, FormService } from 'src/app/modules/form/form.service';
import { ButtonTypes } from 'src/app/modules/button/button.interface';

@Component({
	selector: 'app-users',
	templateUrl: './users.component.html',
	styleUrls: ['./users.component.scss']
})
export class UsersComponent {
	readonly inputTypes = InputTypes;

	formCreate: FormConfig = {
		title: 'Create New User',
		components: [
			{
				module: FormModules.INPUT,
				type: InputTypes.EMAIL,
				placeholder: 'fill email',
				label: 'E-mail',
				input: 'email',
				focused: true
			},
			{
				module: FormModules.INPUT,
				placeholder: 'fill name',
				label: 'Name',
				input: 'name'
			},
			{
				module: FormModules.BUTTON,
				type: ButtonTypes.PRIMARY,
				label: 'Create'
			}
		]
	};

	formUpdate: FormConfig = {
		title: 'Update User',
		components: [
			{
				module: FormModules.INPUT,
				placeholder: 'fill name',
				label: 'Name',
				input: 'name'
			},
			{
				module: FormModules.BUTTON,
				type: ButtonTypes.PRIMARY,
				label: 'Update'
			}
		]
	};

	formVerify: FormConfig = {
		title: 'Are you sure you want to delete this user?',
		components: [
			{
				module: FormModules.BUTTON,
				type: ButtonTypes.PRIMARY,
				label: 'Yes'
			}
		]
	};

	config = {
		create: ()=>{
			this._form.modal(this.formCreate, (user: User) => {
				this.us.create(user);
			});
		},
		update: (user: User)=>{
			this.formUpdate.components[0].set = user.name;
			this._form.modal(this.formUpdate, (data: User) => {
				user.name = data.name;
				this.us.save(user);
			});
		},
		delete: (user: User)=>{
			this._form.modal(this.formVerify, () => {
				this.us.delete(user);
			});
		}
	};

	columns = ['name', 'email'];

	constructor(
		private _form: FormService,
		public us: UserService
	) {
		for (const role of this.us.roles) {
			this.columns.push(role);
		}
	}
}
