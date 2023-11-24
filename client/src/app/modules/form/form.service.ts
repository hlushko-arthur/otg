import { Directive, TemplateRef, Input, ElementRef } from '@angular/core';
import { Injectable } from '@angular/core';
import { ModalService } from 'wacom';
import { ButtonTypes } from '../button/button.interface';
import { InputTypes } from '../input/input.interface';
import { ModalComponent } from './modal/modal.component';

export enum FormModules {
	INPUT = 'winput',
	BUTTON = 'wbutton',
	TEXTAREA = 'wtextarea',
	SELECT = 'wselect'
}

export enum FormOutputs {
	SUBMIT = 'submit',
	CHANGE = 'change'
}

export interface FormComponent {
	id?: number;
	input?: string; // required if you need to keep info on this component
	custom?: string;
	customRef?: ElementRef;
	set?: string | number | Date | object;
	value?: string | number | Date | object;
	module?: FormModules;
	type?: InputTypes | ButtonTypes;
	label?: string;
	hidden?: boolean;
	placeholder?: string;
	disabled?: () => boolean;
	focused?: boolean;
	required?: boolean;
	class?: string;
	boxclass?: string;
	items?: object[] | string[];
	name?: string;
	click?: ()=>void;
	components?: FormComponent[];
}

export interface FormConfig {
	title?: string;
	class?: string;
	output?: FormOutputs;
	components: FormComponent[];
}

@Injectable({
	providedIn: 'root'
})
export class FormService {
	constructor(private _modal: ModalService) {}

	modal(
		config: FormConfig,
		submit = (form: any): void => {},
		change = (): void => {}
	): void {
		this._modal.show({
			component: ModalComponent,
			class: 'forms_modal',
			config,
			submit,
			change
		});
	}
}


@Directive({
	selector: 'ng-template[formcomponent]'
})
export class FormComponentDirective {
	@Input() formcomponent: any;

	constructor(public template: TemplateRef<any>) { }
}
