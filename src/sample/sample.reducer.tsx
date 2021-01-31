import { get, set, keyBy } from 'lodash/fp';
import { handleActions } from 'redux-actions';

import * as AT from 'sample/sample.actions';
import { Post } from 'sample/sample.types';

export type SampleState = {
  posts: Record<string, Post>;
};

const initialState: SampleState = {
  posts: {}
};

const sampleReducer = handleActions(
  {
    [AT.SET_POSTS]: (
      state: SampleState,
      action: ReturnType<typeof AT.setPosts>
    ): SampleState => {
      const posts = get('payload.posts', action);
      const normalizedPosts = keyBy('id', posts);

      return set('posts', normalizedPosts, state);
    }
  },
  initialState
);

export default sampleReducer;
