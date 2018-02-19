// @flow
import { get, set, keyBy } from 'lodash/fp';
import { handleActions } from 'redux-actions';

import type { Action } from 'types/redux.types';
import type { PostsMap } from 'sample/sample.types';

import * as AT from 'sample/sample.actions';

export type SampleState = {|
  posts: PostsMap
|};

const initialState: SampleState = {
  posts: {}
};

const sampleReducer = handleActions(
  {
    [AT.SET_POSTS]: (state: SampleState, action: Action): SampleState =>
      set('posts', keyBy('id', get('payload.posts', action)), state)
  },
  initialState
);

export default sampleReducer;
