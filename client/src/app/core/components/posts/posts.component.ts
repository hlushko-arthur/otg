import { Component, Input } from "@angular/core";
import { PostService } from "../../services/post.service";
import { ActivatedRoute } from "@angular/router";
import { Post } from "../../interfaces/post.interface";

@Component({
	selector: 'admin-panel',
	templateUrl: './admin-panel.component.html',
	styleUrls: ['./admin-panel.component.scss'],
})

export class PostsComponent {
	@Input() posts!: Post[];

	constructor() { }
}