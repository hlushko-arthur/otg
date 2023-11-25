import { Component, Input } from '@angular/core';
import { Post } from 'src/app/core/interfaces/post.interface';

@Component({
	selector: 'app-public-info',
	templateUrl: './public-info.component.html',
	styleUrls: ['./public-info.component.scss']
})
export class PublicInfoComponent {
	@Input() posts!: Post[];
}
