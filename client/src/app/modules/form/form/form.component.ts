import { AfterContentInit, Component, ContentChildren, EventEmitter, Input, OnInit, Output, QueryList } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { CoreService } from 'wacom';
import { FormConfig, FormComponentDirective } from '../form.service';

@Component({
	selector: 'wform',
	templateUrl: './form.component.html',
	styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit, AfterContentInit {
	@ContentChildren(FormComponentDirective)
	formComponents: QueryList<FormComponentDirective>;

	customComponents: any = {};

	ngAfterContentInit(): void {
		for (const comp of this.formComponents.toArray()) {
			this.customComponents[comp.formcomponent] = comp.template;
		}
	}

	@Input() config: FormConfig;

	@Input() form = this._fb.group({});

	@Output() wChange = new EventEmitter();

	@Output() wSubmit = new EventEmitter();

	constructor(
		private _core: CoreService,
		private _fb: FormBuilder
	) {}

	ngOnInit(): void {
		for (const component of this.config.components) {
			if (!component.input) {
				continue;
			}

			const validators = [];

			if (component.required) {
				validators.push(Validators.required);
			}

			this.form.addControl(
				component.input,
				new FormControl(component.set, validators)
			);
		}
	}

	onSubmit(): void {
		this._core.afterWhile(this, ()=>{
			const values: any = {};

			for (const field in this.form.controls) {
				values[field] = this.form.get(field)?.value;
			}

			this.wSubmit.emit(values);
		});
	}

	onChange(): void {
		this._core.afterWhile(this, ()=>{
			const values: any = {};

			for (const field in this.form.controls) {
				values[field] = this.form.get(field)?.value;
			}

			this.wChange.emit(values);
		});
	}
}
