import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Posts } from '../models/posts';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(public http: HttpClient) { }

  getAllPosts(): Observable<Posts[]> {
    return this.http.get<Posts[]>(`${environment.BASE_URL}posts`);
  }
  getPostById(postID): Observable<Posts> {
    return this.http.get<Posts>(`${environment.BASE_URL}posts/` + postID);
  }
  updatePost(post: Posts): Observable<Posts> {
    let headerOptions = new HttpHeaders({
      'Content-Type': 'application/json; charset=UTF-8',
    });

    return this.http.put<Posts>(`${environment.BASE_URL}posts/` + post.id, post, { headers: headerOptions });
  }

  deletePost(postID): Observable<any> {
    return this.http.delete<any>(`${environment.BASE_URL}posts/` + postID);
  }
}
