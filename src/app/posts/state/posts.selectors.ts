import { createFeatureSelector, createSelector } from "@ngrx/store";
import { RouterStateUrl } from "src/app/store/router/custom.serializer";
import { getCurrentRoute } from "src/app/store/router/router.selector";
import { postAdapter, PostsState } from "./posts.state";

export const POST_STATE_NAME = 'posts';
const getPostsState = createFeatureSelector<PostsState>(POST_STATE_NAME);
export const postSelectors = postAdapter.getSelectors();
export const getPostEntities = createSelector(getPostsState , postSelectors.selectEntities);
export const getPosts = createSelector(getPostsState, postSelectors.selectAll);

export const getPostById = createSelector(
  getPostEntities , getCurrentRoute,(posts, route: RouterStateUrl) => {
    return posts ? posts[route.params['id']] : null;
});
