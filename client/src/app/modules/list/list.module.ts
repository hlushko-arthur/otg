import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core';
import { ListComponent } from './list.component';
import { ItemDirective } from './list.directive';

@NgModule({
	imports: [
		CoreModule
	],
	declarations: [
		ItemDirective,
		ListComponent
	],
	exports: [
		ItemDirective,
		ListComponent
	],
	providers: []

})

export class ListModule { }