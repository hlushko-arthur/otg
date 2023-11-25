import { AlertService } from 'wacom';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { HttpService } from './http.service';
import {
	ServerResponse,
	ServerResponseError
} from '../interfaces/server.interface';
import { Post } from '../interfaces/post.interface';

@Injectable({
	providedIn: 'root'
})
export class PostService {

	posts: {
		[key: string]: Post[]
	} = {};

	constructor(
		private _alert: AlertService,
		private _http: HttpService
	) {

	}

	async create(post: Post): Promise<void> {
		await this._http.post('/api/post/create', post).then((resp: ServerResponse) => {
			console.log(resp);
		})
	}

	async get(tab: string): Promise<Post[]> {
		await this._http.get(`/api/post/get/${tab}`).then((resp: ServerResponse) => {
			this.posts[tab] = resp.data as Post[];
		})

		return this.posts[tab];
	}

	private _handleError(err: { message: string }): void {
		this._alert.destroy();

		this._alert.warning({
			text: `Something went wrong. ${err.message}`
		});
	}
}
