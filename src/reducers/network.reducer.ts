import { set } from 'lodash/fp';
import { handleActions } from 'redux-actions';

import * as AT from 'actions/network.actions';
import { NetworkAction } from 'actions/network.actions';

export type NetworkState = {
  readonly [key: string]: number;
};

const initialState: NetworkState = {};

const networkReducer = handleActions<NetworkState>(
  {
    [AT.START_NETWORK](state, action: NetworkAction) {
      const { networkLabel } = action.payload;

      return set(
        networkLabel,
        state[networkLabel] ? state[networkLabel] + 1 : 1,
        state
      );
    },
    [AT.END_NETWORK](state, action: NetworkAction) {
      const { networkLabel } = action.payload;

      return set(
        networkLabel,
        state[networkLabel] ? state[networkLabel] - 1 : 0,
        state
      );
    }
  },
  initialState
);

export default networkReducer;
