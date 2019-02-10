import { get, set, keyBy } from 'lodash/fp';
import { handleActions } from 'redux-actions';

import { PostsMap } from 'sample/sample.types';
import { SetPostsAction } from 'sample/sample.actions';

import * as AT from 'sample/sample.actions';

export type SampleState = {
  posts: PostsMap;
};

const initialState: SampleState = {
  posts: {}
};

const sampleReducer = handleActions(
  {
    [AT.SET_POSTS]: (
      state: SampleState,
      action: SetPostsAction
    ): SampleState => {
      const posts = get('payload.posts', action);
      const normalizedPosts = keyBy('id', posts);

      return set('posts', normalizedPosts, state);
    }
  },
  initialState
);

export default sampleReducer;
