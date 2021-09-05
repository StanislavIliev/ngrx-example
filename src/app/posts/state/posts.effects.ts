import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { mergeMap , map, switchMap, tap, filter, withLatestFrom} from "rxjs/operators";
import { PostService } from "src/app/services/post.service";
import { addPost, addPostSuccess, deletePost, deletePostSuccess, dummyAction, loadPosts, loadPostsSuccess, updatePost, updatePostSuccess } from "./posts.actions";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/store/app.state";
import { setErrorMessage } from "src/app/store/Shared/shared.actions";
import { RouterNavigatedAction,  ROUTER_NAVIGATION } from "@ngrx/router-store";
import { Update } from "@ngrx/entity";
import { Post } from "src/app/model/post.model";
import { getPosts } from "./posts.selectors";
import { of } from "rxjs";

@Injectable()
export class PostsEffects{
  constructor(private actions$: Actions,
    private postService : PostService,
    private store: Store<AppState>,
    private router: Router
    ){}

loadPosts$ = createEffect(() => {
return this.actions$.pipe(
  ofType(loadPosts),
  withLatestFrom(this.store.select(getPosts)),
  mergeMap(([action,posts]) => {
    if(!posts.length || posts.length === 1){
return this.postService.getPosts().pipe(
  map((posts) => {
    return loadPostsSuccess({ posts });
  })
  );
}
return of(dummyAction());
})
);
});

addPost$ = createEffect(() => {
 return this.actions$.pipe
 (ofType(addPost),
 mergeMap((action) => {
   return this.postService.addPost(action.post).pipe(map((data) => {
    const post = {...action.post,id: data.name};
    return addPostSuccess({ post });
   })
   );
 })
 );
});

updatePost$ = createEffect(() => {
  return this.actions$.pipe
  (ofType(updatePost),
  switchMap((action) => {
    return this.postService.updatePost(action.post).pipe(map((data) => {
      const updatedPost: Update<Post> = {
        id: action.post.id,
        changes: {
          ...action.post
        }
      }
     return updatePostSuccess({ post: updatedPost });
    })
    );
  })
  );
 });

 updatePostRedirect$ = createEffect(() => {
  return this.actions$.pipe(
    ofType(...[updatePostSuccess,updatePost]),
    tap((action) => {
      this.store.dispatch(setErrorMessage({ message: '' }));
      this.router.navigate(['/posts']);
    })
    );
},
{ dispatch: false });


deletePost$ = createEffect(() => {
  return this.actions$.pipe
  (ofType(deletePost),
  switchMap((action) => {
    return this.postService.deletePost(action.id).pipe(map((data) => {
     return deletePostSuccess({ id: action.id });
    })
    );
  })
  );
 });

 getsinglePost$ = createEffect(() => {
   return this.actions$.pipe(ofType(ROUTER_NAVIGATION),
   filter((r: RouterNavigatedAction) => {
    return r.payload.routerState.url.startsWith('/posts/details');
   }), map((r : RouterNavigatedAction) => {
     return r.payload.routerState['params']['id'];
   }),
   withLatestFrom(this.store.select(getPosts)),
   switchMap(([id, posts]) => {
     if(!posts.length){
     return this.postService.getPostById(id).pipe(
       map((post) => {
       const postData = [{...post,id}];
       return loadPostsSuccess({ posts: postData});
     })
     );
    }
    return of(dummyAction());
   })
   );
 });
}
