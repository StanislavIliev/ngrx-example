import { createEntityAdapter, EntityState } from "@ngrx/entity";
import { Post } from "src/app/model/post.model";

export interface PostsState extends EntityState<Post>{
}
export const postAdapter =  createEntityAdapter<Post>();

export const initialState: PostsState = postAdapter.getInitialState();

