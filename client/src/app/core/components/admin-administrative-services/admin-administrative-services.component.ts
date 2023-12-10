import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../services/config.service';
import { AdministrativeService } from '../../services/administrative.service';
import { IAdministrativeService } from '../../interfaces/administrativeService.interface';

@Component({
	selector: 'admin-administrative-services',
	templateUrl: './admin-administrative-services.component.html',
	styleUrls: ['./admin-administrative-services.component.scss']
})
export class AdminAdministrativeServicesComponent implements OnInit {
	activeAdministrativeService: IAdministrativeService =
		{} as IAdministrativeService;

	isShowAnswer = false;

	tinymceContent = '';

	tinyConfig = {};

	constructor(
		private _as: AdministrativeService,
		public config: ConfigService
	) {
		this.tinyConfig = {
			...config.tinyConfig,
			height: '300px'
		};
	}

	async ngOnInit(): Promise<void> {
		await this._as.get();

		this.activeAdministrativeService =
			this._as.administrativeServices[
				this._as.administrativeServices.length - 1
			];
	}

	get administrativeServices(): IAdministrativeService[] {
		return this._as.administrativeServices;
	}

	get statuses(): string[] {
		return this._as.statuses;
	}

	async deleteAdministrativeService(
		administrativeService: IAdministrativeService
	): Promise<void> {
		await this._as.delete(administrativeService);

		this.activeAdministrativeService = {} as IAdministrativeService;
	}

	changeAdministrativeServiceStatus(
		administrativeService: IAdministrativeService
	): void {
		administrativeService.status = Number(administrativeService.status) as
			| 0
			| 1
			| 2;

		this._as.changeStatus(administrativeService);
	}

	sendAnswer(administrativeService: IAdministrativeService): void {
		this._as.sendAnswer(administrativeService, this.tinymceContent);
	}

	administrativeServiceStatus(status: 0 | 1 | 2): string {
		return this._as.statuses[status ?? 0];
	}
}
