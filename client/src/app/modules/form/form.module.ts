import { CommonModule } from '@angular/common';
import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';
import { ButtonModule } from '../button/button.module';
import { InputModule } from '../input/input.module';
import { FormComponent } from './form/form.component';
import { ModalComponent } from './modal/modal.component';
import { ComponentComponent } from './form/component/component.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormComponentDirective } from './form.service';
import { SelectModule } from '../select/select.module';
export interface FormConfig {
	inputs?: object;
}
export const CONFIG_TOKEN = new InjectionToken<FormConfig>('formConfig');
export const DEFAULT_FORM_CONFIG: FormConfig = {
	inputs: {}
}

@NgModule({
	imports: [
		CommonModule,
		ReactiveFormsModule,
		InputModule,
		ButtonModule,
		SelectModule
	],
	declarations: [
		ModalComponent,
		FormComponent,
		ComponentComponent,
		FormComponentDirective
	],
	exports: [
		FormComponent,
		FormComponentDirective
	]
})
export class FormModule {
	static forRoot(config: FormConfig = DEFAULT_FORM_CONFIG): ModuleWithProviders<FormModule> {
		return {
			ngModule: FormModule,
			providers: [{
				provide: CONFIG_TOKEN,
				useValue: config
			}]
		}
	}
}
