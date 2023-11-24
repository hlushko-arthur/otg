import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core';
import { AlertComponent } from './alert.component';
import { AlertWrapperComponent } from './alert-wrapper/alert-wrapper.component';

@NgModule({
	imports: [
		CoreModule
	],
	declarations: [
		AlertComponent,
  AlertWrapperComponent
	],
	exports: [
		AlertComponent
	],
	providers: []

})

export class AlertModule { }