import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
	selector: 'phone',
	templateUrl: './phone.component.html',
	styleUrls: ['./phone.component.scss']
})
export class PhoneComponent {
	@Input() label: string;

	@Input() phone = '';

	@Input() disabled: boolean;

	@Output() phoneChange = new EventEmitter<string>();

	constructor() {}
}
