import { Post } from "src/app/model/post.model";

export interface PostsState {
    posts: Post[];
}

export const initialState: PostsState = {
    posts: [
        { id: '1', title: 'Sample Title 1', description: 'SampleDescription 1' },
        { id: '2', title: 'Sample Title 2', description: 'SampleDescription 2' }
    ]
}