import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from 'src/app/core/services/post.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
	templateUrl: './main.component.html',
	styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
	tab = '';
	constructor(private _router: Router, private _activatedRoute: ActivatedRoute, private _us: UserService, private _post: PostService) { }

	ngOnInit(): void {
		this.tab = this._activatedRoute.snapshot.queryParams['tab'];

		if (!this.tab) {
			this.setTab('general');
		}
	}

	setTab(tab: string): void {
		this.tab = tab;

		this._router.navigate(['/'], {
			queryParams: {
				tab: this.tab
			}
		})
	}

	isAdmin(): boolean {
		return this._us.user.admin;
	}
}
