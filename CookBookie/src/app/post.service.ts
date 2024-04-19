import { Injectable } from '@angular/core';
import { Post } from './post';
import { HttpClient,HttpClientJsonpModule } from '@angular/common/http';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PostService {
  //privately instantiate posts interface.
  private posts:Post[] = [];
  //create new subject
  private postUpdate = new Subject<Post[]>()

  constructor(http:HttpClient) { }
}
