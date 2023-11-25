import { Component, Input } from '@angular/core';
import { Post } from 'src/app/core/interfaces/post.interface';

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.scss']
})
export class AnnouncementComponent {

  @Input() posts!: Post[];

}
