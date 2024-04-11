import { Injectable } from '@angular/core';
import { Post } from './post';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private posts: Post[] = [];
  private postUpdate = new Subject<Post[]>()
  constructor(private http: HttpClient) { }
  

  editPost(){
    //need to change this to  patch probably
    this.http.get<{message:string,posts:Post[]}>('http://projecturl.com').subscribe((postdata)=>{
      this.posts = postdata.posts;
    })
  }
}
