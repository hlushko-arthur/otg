import { Component, OnInit } from "@angular/core";

type adminTabs = 'requests' | 'administrativeServices';
@Component({
	templateUrl: './admin-panel.component.html',
	styleUrls: ['./admin-panel.component.scss']
})

export class AdminPanelComponent implements OnInit {
	activeTab: adminTabs = 'administrativeServices';

	constructor() { }

	ngOnInit(): void {

	}
}