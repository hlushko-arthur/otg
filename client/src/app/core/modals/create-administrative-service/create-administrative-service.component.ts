import { Component, OnInit } from "@angular/core";
import { Category, ConfigService, Service } from "../../services/config.service";
@Component({
	templateUrl: './create-administrative-service.component.html',
	styleUrls: ['./create-administrative-service.component.scss']
})

export class CreateAdministrativeServiceComponent implements OnInit {

	selectedCategory: Category = {} as Category;

	selectedService: Service = {} as Service;

	constructor(public config: ConfigService) { }

	ngOnInit(): void {

	}

	clearSelectedService(): void {
		this.selectedService = {} as Service;
	}

}