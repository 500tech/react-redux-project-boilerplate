// @flow
import type { Posts } from 'sample/sample.types';
import type { BaseAction } from 'types/redux.types';
import { apiAction } from 'actions/api.actions';

export const FETCH_POSTS = '[posts] Fetch Posts';
export const SET_POSTS = '[posts] Set Posts';

export const POSTS_LABEL = 'posts';

export type SetPostsAction = BaseAction<{|
  +posts: Posts
|}>;

export type SampleAction = SetPostsAction;

/* 
* Sample API action
*/
export const fetchPosts = () =>
  apiAction({
    type: FETCH_POSTS,
    payload: {
      networkLabel: POSTS_LABEL,
      method: 'GET',
      path: 'posts',
      onSuccess: setPosts
    }
  });

export const setPosts = (posts: Posts): SetPostsAction => ({
  type: SET_POSTS,
  payload: {
    posts
  }
});
