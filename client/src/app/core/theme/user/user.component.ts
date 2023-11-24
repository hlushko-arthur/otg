import { Component, Renderer2 } from '@angular/core';
import { coreAnimation } from 'src/app/core';
import { UserService } from 'src/app/core';
import { StoreService } from 'wacom';

@Component({
	selector: 'app-user',
	templateUrl: './user.component.html',
	styleUrls: ['./user.component.scss'],
	animations: [coreAnimation]
})

export class UserComponent {
	show = false;

	mode = '';
	showDesktop = false;
	constructor(
		private renderer: Renderer2,
		private store: StoreService,
		public us: UserService
	) {
		this.store.get('mode', (mode: string) => {
			if (mode) {
				this.mode = mode;

				this.renderer.addClass(document.body.parentNode, mode);
			}
		});
	}

	set(mode = ''): void {
		if (mode) {
			this.store.set('mode', mode);

			this.renderer.addClass(document.body.parentNode, mode);
		} else {
			this.store.remove('mode');

			this.renderer.removeClass(document.body.parentNode, 'dark');
		}

		this.mode = mode;
	}
}
