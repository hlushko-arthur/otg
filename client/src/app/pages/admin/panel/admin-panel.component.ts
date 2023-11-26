import { Component, OnInit } from "@angular/core";

@Component({
	templateUrl: './admin-panel.component.html',
	styleUrls: ['./admin-panel.component.scss']
})

export class AdminPanelComponent implements OnInit {
	activeTab: 'requests' = 'requests';

	constructor() { }

	ngOnInit(): void {

	}
}