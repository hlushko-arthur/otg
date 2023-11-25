import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { Post } from "../../interfaces/post.interface";
import { UserService } from "../../services/user.service";
import { PostService } from "../../services/post.service";
import { ModalService } from "wacom";

@Component({
	selector: 'posts',
	templateUrl: './posts.component.html',
	styleUrls: ['./posts.component.scss'],
})

export class PostsComponent implements OnChanges {
	@Input() posts!: Post[];

	constructor(private _us: UserService, private _ps: PostService, private _modal: ModalService) { }

	get isAdmin(): boolean {
		return this._us.user.admin;
	}

	deletePost(post: Post): void {
		this._ps.delete(post);
	}

	editPost(post: Post): void {
		this._modal.open({
			component: 'createPost',
			content: post.content,
			onChange: (content: string): void => {
				post.content = content;
				this._ps.update(post);
			}
		})
	}

	ngOnChanges(changes: SimpleChanges): void {
		console.log(changes);

		if (changes['posts']?.currentValue) {
			this.posts = changes['posts'].currentValue;
		}
	}
}