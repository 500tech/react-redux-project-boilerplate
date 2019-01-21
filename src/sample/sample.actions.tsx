import { Post } from 'sample/sample.types';
import { BaseAction } from 'types/base-redux.types';
import { ApiAction } from '../actions/api.actions';

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
    onSuccess: setPosts
  }
});

export const setPosts = (postsResponse: PostsApiResponse): SetPostsAction => {
  return {
    type: SET_POSTS,
    payload: {
      posts: postsResponse
    }
  };
};
