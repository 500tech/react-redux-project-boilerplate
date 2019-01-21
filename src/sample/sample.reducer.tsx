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
      return set('posts', keyBy('id', get('payload.posts', action)), state);
    }
  },
  initialState
);

export default sampleReducer;
