import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/core/interfaces/post.interface';
import { PostService } from 'src/app/core/services/post.service';

@Component({
	selector: 'app-general',
	templateUrl: './general.component.html',
	styleUrls: ['./general.component.scss']
})
export class GeneralComponent implements OnInit {
	posts: Post[];
	constructor(private _post: PostService) { }

	ngOnInit(): void {
		this._post.get('general').then((posts: Post[]) => {
			this.posts = posts;
		});
	}
}
