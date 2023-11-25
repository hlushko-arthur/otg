import { Component, Input } from '@angular/core';
import { Post } from 'src/app/core/interfaces/post.interface';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss']
})
export class PhotosComponent {
  @Input() posts!: Post[];
}
