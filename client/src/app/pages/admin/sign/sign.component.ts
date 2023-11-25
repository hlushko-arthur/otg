import { Component } from '@angular/core';
import { HttpService } from 'src/app/core/services/http.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
	templateUrl: './sign.component.html',
	styleUrls: ['./sign.component.scss']
})
export class SignComponent {
	user: { login: string; password: string } = { login: '', password: '' };
	constructor(private _us: UserService) { }

	submit(): void {
		this._us.login(this.user);
	}
}
