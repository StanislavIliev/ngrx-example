import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Post } from "../model/post.model";

@Injectable({
  providedIn: 'root',
})
export class PostService{

  constructor(private http: HttpClient){
}
getPosts(): Observable<Post[]>{
  return this.http.get<Post[]>(`https://lelyaa-b0869-default-rtdb.firebaseio.com/post.json`)
  .pipe(map((data) => {
    const posts: Post[] = [];
    for(let key in data){
      posts.push({ ...data[key], id: key });
    }
    return posts;
  }));
}

addPost(post: Post): Observable<{name: string}>{
  console.log(post);
  return this.http.post<{name: string}>(`https://lelyaa-b0869-default-rtdb.firebaseio.com/post.json`,post);
}

updatePost(post: Post) {
  const postData = {[ post.id]: { title: post.title, description: post.description}}
  return this.http.patch(`https://lelyaa-b0869-default-rtdb.firebaseio.com/post.json`,postData);
}

deletePost(id: string) {
  return this.http.delete(`https://lelyaa-b0869-default-rtdb.firebaseio.com/post/${id}.json`);
}
getPostById(id: string): Observable<Post> {
  return this.http.get<Post>(`https://lelyaa-b0869-default-rtdb.firebaseio.com/post/${id}.json`);
}
}
