import { AlertService } from 'wacom';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { HttpService } from './http.service';
import {
	ServerResponse,
	ServerResponseError
} from '../interfaces/server.interface';
import { NewPost, Post } from '../interfaces/post.interface';

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

	async create(post: NewPost): Promise<void> {
		await this._http.post('/api/post/create', post).then((resp: ServerResponse) => {
			if (resp.status) {
				const post = (resp.data as Post[])[0] as Post;
				if (!this.posts[post.type]) {
					this.posts[post.type] = [];
				}

				this.posts[post.type].unshift(post);

				console.log(this.posts);

			}
		})
	}

	async get(tab: string): Promise<Post[]> {
		await this._http.get(`/api/post/get/${tab}`).then((resp: ServerResponse) => {
			this.posts[tab] = resp.data as Post[];
		})

		return this.posts[tab];
	}

	async delete(post: Post): Promise<void> {
		await this._http.post('/api/post/delete', {
			_id: post._id
		}).then((resp: ServerResponse) => {
			if (resp.status) {
				const postIndex = this.posts[post.type].findIndex((_post) => _post._id == post._id);

				this.posts[post.type].splice(postIndex, 1);
			}
		})
	}

	async update(post: Post): Promise<void> {
		await this._http.post('/api/post/update', {
			_id: post._id,
			content: post.content
		}).then((resp: ServerResponse) => {
			if (resp.status) {
				this._alert.success({
					text: 'Пост успішно оновлено'
				})
			}
		})
	}

	private _handleError(err: { message: string }): void {
		this._alert.destroy();

		this._alert.warning({
			text: `Something went wrong. ${err.message}`
		});
	}
}
