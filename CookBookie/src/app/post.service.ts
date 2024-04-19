import { Injectable } from '@angular/core';
import { Post } from './post';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private posts:Post[] = []

  constructor() { }
}
