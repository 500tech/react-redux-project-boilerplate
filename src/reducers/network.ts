import { set } from 'lodash/fp';
import { handleActions } from 'redux-actions';

import * as AT from 'actions/network';

export type NetworkState = Record<string, number>;

const initialState: NetworkState = {};

const network = handleActions<NetworkState>(
  {
    [AT.START_NETWORK](state, action: ReturnType<typeof AT.startNetwork>) {
      const { networkLabel } = action.payload;

      return set(
        networkLabel,
        state[networkLabel] ? state[networkLabel] + 1 : 1,
        state
      );
    },
    [AT.END_NETWORK](state, action: ReturnType<typeof AT.endNetwork>) {
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

export default network;
