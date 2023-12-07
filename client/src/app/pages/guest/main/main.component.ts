import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/core/interfaces/post.interface';
import { PostService } from 'src/app/core/services/post.service';
import { UserService } from 'src/app/core/services/user.service';
import { ModalService } from 'wacom';

@Component({
	templateUrl: './main.component.html',
	styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
	tab = '';
	constructor(private _modal: ModalService, private _router: Router, private _activatedRoute: ActivatedRoute, private _us: UserService, private _ps: PostService) { }

	ngOnInit(): void {
		this.tab = this._activatedRoute.snapshot.queryParams['tab'];

		if (!this.tab) {
			this.setTab('general');
		} else {
			this._ps.get(this.tab);
		}

		this.openAdministrativeServiceModal();
	}

	setTab(tab: string): void {
		this.tab = tab;

		this._router.navigate(['/'], {
			queryParams: {
				tab: this.tab
			}
		});

		this._ps.get(this.tab);
	}

	logout(): void {
		this._us.logout();
	}

	openSendRequestModal(): void {
		this._modal.open({
			component: 'createRequest'
		});
	}

	openAdministrativeServiceModal(): void {
		this._modal.open({
			component: 'createAdministrativeService'
		});
	}

	get isAdmin(): boolean {
		return this._us.user.admin;
	}

	get posts(): Post[] {
		return this._ps.posts[this.tab] || [];
	}

	get isAuthorized(): boolean {
		return !!this._us.user.login;
	}
}
