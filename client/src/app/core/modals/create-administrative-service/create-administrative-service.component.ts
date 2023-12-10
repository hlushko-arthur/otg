import { Component, OnInit } from '@angular/core';
import {
	Category,
	ConfigService,
	Service
} from '../../services/config.service';
import { AdministrativeService } from '../../services/administrative.service';
import { NewAdministrativeService } from '../../interfaces/administrativeService.interface';
import * as moment from 'moment';

@Component({
	templateUrl: './create-administrative-service.component.html',
	styleUrls: ['./create-administrative-service.component.scss']
})
export class CreateAdministrativeServiceComponent {
	selectedCategory: Category = {} as Category;

	selectedService: Service = {} as Service;

	form: NewAdministrativeService = {} as NewAdministrativeService;

	isAdministrativeServiceSent = false;

	close: () => void;

	constructor(
		public config: ConfigService,
		private _as: AdministrativeService
	) {}

	clearSelectedService(): void {
		this.selectedService = {} as Service;
	}

	createAdministrativeService(): void {
		this.form.birthday = moment(this.form.birthday).format('YYYY-MM-DD');

		this._as.create(this.form);

		this.isAdministrativeServiceSent = true;
	}

	get isButtonDisabled(): boolean {
		const isBasicInfoIncomplete =
			!this.form.fullName ||
			!this.form.email ||
			!this.form.phone ||
			!this.form.birthday;

		const isTextRequired = !this.selectedService.extract && !this.form.text;

		return isBasicInfoIncomplete || isTextRequired;
	}
}
