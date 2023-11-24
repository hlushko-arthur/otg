import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WacomModule } from 'wacom';
import { ButtonModule } from 'src/app/modules/button/button.module';
import { InputModule } from 'src/app/modules/input/input.module';
import { CardModule } from 'src/app/modules/card/card.module';
import { FormModule } from 'src/app/modules/form/form.module';
import { TableModule } from '../modules/table/table.module';
import { UserComponent } from './selectors/user/user.component';

@NgModule({
	declarations: [UserComponent],
	exports: [ /* exports */
		CommonModule,
		FormsModule,
		WacomModule,
		ButtonModule,
		InputModule,
		CardModule,
		FormModule,
		TableModule
	],
	imports: [CommonModule, FormsModule, WacomModule]
})
export class CoreModule {}
