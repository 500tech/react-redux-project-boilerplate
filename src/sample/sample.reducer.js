// @flow
import { get, set, keyBy } from 'lodash/fp';
import { handleActions } from 'redux-actions';

import type { PostsMap } from 'sample/sample.types';
import type { SetPostsAction } from 'sample/sample.actions';

import * as AT from 'sample/sample.actions';

export type SampleState = {|
  +posts: PostsMap
|};

const initialState: SampleState = {
  posts: {}
};

const sampleReducer = handleActions(
  {
    [AT.SET_POSTS]: (state: SampleState, action: SetPostsAction): SampleState =>
      set('posts', keyBy('id', get('payload.posts', action)), state)
  },
  initialState
);

export default sampleReducer;
