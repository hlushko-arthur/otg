import { Component } from '@angular/core';
import { FormConfig } from '../form.service';

@Component({
	templateUrl: './modal.component.html',
	styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
	config: FormConfig;

	close: () => void;

	submit: (form: any) => void;
}
