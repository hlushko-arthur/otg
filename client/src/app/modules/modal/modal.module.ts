import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core';
import { ModalComponent } from './modal.component';

@NgModule({
	imports: [
		CoreModule
	],
	declarations: [
		ModalComponent
	],
	exports: [
		ModalComponent
	],
	providers: []

})

export class ModalModule { }
