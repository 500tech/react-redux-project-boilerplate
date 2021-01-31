import { Post } from 'sample/sample.types';
import { BaseAction } from 'types/base-redux';
import { ApiAction } from 'actions/api';

export const FETCH_POSTS = '[posts] Fetch Posts';
export const SET_POSTS = '[posts] Set Posts';

export const POSTS_LABEL = 'posts';

export interface SetPostsAction extends BaseAction {
  payload: {
    posts: Post[];
  };
}

export type PostsApiResponse = Post[];

/*
 * Sample API action
 * In the onSuccess callback we get the PostsAPIResponse type and then call the setPosts action
 * This is done so we don't let the server response affect our actions.
 * We need to map the server response into the data type that fits our application
 * for example if we'll want to call setPosts outside this API action (with other data structure) or from a component.
 */
export const fetchPosts = (): ApiAction<PostsApiResponse> => ({
  type: FETCH_POSTS,
  meta: {
    api: true
  },
  payload: {
    networkLabel: POSTS_LABEL,
    method: 'get',
    path: 'posts',
    onSuccess: (postsResponse: PostsApiResponse) => setPosts(postsResponse)
  }
});

export const setPosts = (posts: Array<Post>) => {
  return {
    type: SET_POSTS,
    payload: {
      posts
    }
  };
};
