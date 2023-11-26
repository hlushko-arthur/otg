import { Component, OnInit } from "@angular/core";
import { ConfigService } from "../../services/config.service";

@Component({
	templateUrl: './create-post.component.html',
	styleUrls: ['./create-post.component.scss']
})

export class CreatePostComponent implements OnInit {

	constructor(public config: ConfigService) { }

	content = '';

	isEdit = false;

	close: () => void;

	onChange: (content: string) => void;

	ngOnInit(): void {
		this.isEdit = !!this.content;
	}

	createPost(): void {
		this.onChange(this.content);
		this.close();
	}
}