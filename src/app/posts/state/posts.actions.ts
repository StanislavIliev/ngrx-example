import { createAction, props } from "@ngrx/store";
import { Post } from "src/app/model/post.model";


export const ADD_POST_ACTION = '[post page] add post';

export const addPost = createAction(ADD_POST_ACTION, props<{post: Post}>());