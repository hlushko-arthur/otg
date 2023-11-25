import { Component, Input } from '@angular/core';
import { Post } from 'src/app/core/interfaces/post.interface';

@Component({
	selector: 'app-contacts',
	templateUrl: './contacts.component.html',
	styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent {
	@Input() posts!: Post[];
}
