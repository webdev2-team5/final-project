import { Component } from '@angular/core';
import { Post } from '../post';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrl: './post-edit.component.css'
})
export class PostEditComponent {
  //the post object we will edit
  post: Post[] = [];
  
  
}
