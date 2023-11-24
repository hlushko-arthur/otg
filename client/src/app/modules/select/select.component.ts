import { Component, ElementRef, Input, TemplateRef, ViewChild, Output, EventEmitter, OnInit } from '@angular/core';
@Component({
	selector: 'wselect',
	templateUrl: './select.component.html',
	styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {
	@Output() update: EventEmitter<any> = new EventEmitter<any>();

	@Input() placeholder: string = "";

	@Input() items: any = [];

	_items: any = {};

	@Input() disabled = false;

	@Input() name = 'name';

	@Input() value = 'id';

	@Input() multiple: boolean = false;

	@Input() label: string = '';

	@Input() searchable: boolean = false;

	@Output() modelChange = new EventEmitter();

	_values: any = [];

	_names: any = [];

	_selected: string;

	selectShow: any;

	@Input('select') select: any = {};

	@Input('view') t_view: TemplateRef<any>;

	@Input('item') t_item: TemplateRef<any>;

	@Input('search') t_search: TemplateRef<any>;

	search: string = '';

	@ViewChild('e_search', { static: false }) e_search: ElementRef;

	focus_search(): void {
		this.search = '';
		if (!this.searchable || this.t_search) return;
		if (this.e_search) {
			this.e_search.nativeElement.focus();
		} else {
			setTimeout(this.focus_search.bind(this), 100);
		}
	}

	ngOnInit(): void {
		for (let i = 0; i < this.items.length; i++) {
			if (typeof this.items[i] === 'string') {
				this.items[i] = {
					name: this.items[i],
					id: this.items[i]
				}
			}
			this._items[this.items[i].id] = this.items[i];
		}
	}

	item_onclick(item: any): void {
		if (this.multiple) {
			if (this._values.indexOf(item[this.value]) != -1) {
				this._values.splice(this._values.indexOf(item[this.value]), 1);
			} else {
				this._values.push(item[this.value]);
			}
			if (this._names.indexOf(item[this.name]) != -1) {
				this._names.splice(this._names.indexOf(item[this.name]), 1);
			} else {
				this._names.push(item[this.name]);
			}
			this._selected = this._names.length == 0 ? this.placeholder : this._names.join(', ');
			this.modelChange.emit(this._values);
		} else {
			this._selected = item[this.name];
			this.selectShow = false;
			this.modelChange.emit(item);
		}
	}
}