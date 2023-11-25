import { Component, Input } from '@angular/core';
import { Post } from 'src/app/core/interfaces/post.interface';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent {

  @Input() posts!: Post[];

}
