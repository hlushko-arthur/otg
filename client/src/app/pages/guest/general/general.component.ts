import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/core/interfaces/post.interface';
import { PostService } from 'src/app/core/services/post.service';

@Component({
	selector: 'app-general',
	templateUrl: './general.component.html',
	styleUrls: ['./general.component.scss']
})
export class GeneralComponent implements OnInit {
	@Input() posts!: Post[];
	constructor() { }

	ngOnInit(): void {

	}
}
