import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/core/interfaces/post.interface';
import { PostService } from 'src/app/core/services/post.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
	templateUrl: './main.component.html',
	styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
	tab = '';
	constructor(private _router: Router, private _activatedRoute: ActivatedRoute, private _us: UserService, private _ps: PostService) { }

	ngOnInit(): void {
		this.tab = this._activatedRoute.snapshot.queryParams['tab'];

		if (!this.tab) {
			this.setTab('general');
		} else {
			this._ps.get(this.tab);
		}
	}

	setTab(tab: string): void {
		this.tab = tab;

		this._router.navigate(['/'], {
			queryParams: {
				tab: this.tab
			}
		})

		this._ps.get(this.tab);
	}

	isAdmin(): boolean {
		return this._us.user.admin;
	}

	get posts(): Post[] {
		return this._ps.posts[this.tab] || [];
	}
}
