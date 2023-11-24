import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from './input.component';

@NgModule({
	imports: [ReactiveFormsModule, CommonModule],
	declarations: [InputComponent],
	providers: [],
	exports: [InputComponent]
})
export class InputModule {}