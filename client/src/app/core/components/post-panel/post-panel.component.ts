import { Component } from "@angular/core";
import { PostService } from "../../services/post.service";
import { ActivatedRoute } from "@angular/router";
import * as moment from "moment";
import { NewPost } from "../../interfaces/post.interface";
import { ModalService } from "wacom";

@Component({
	selector: 'post-panel',
	templateUrl: './post-panel.component.html',
	styleUrls: ['./post-panel.component.scss'],
})

export class PostPanelComponent {
	isAddNewPost = false;

	constructor(private _post: PostService, private _activatedRoute: ActivatedRoute, private _modal: ModalService) { }

	openCreatePostModal(): void {
		this._modal.open({
			component: 'createPost',
			onChange: (content: string): void => {
				const post: NewPost = {
					type: this._activatedRoute.snapshot.queryParams['tab'],
					content: content,
					dateCreated: moment().format('YYYY-MM-DD')
				}
				this._post.create(post);
			}
		})
	}
}