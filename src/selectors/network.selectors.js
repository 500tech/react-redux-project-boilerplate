// @flow
import { createSelector } from 'reselect';

import type { State } from 'types/redux.types';
import type { NetworkState } from 'reducers/network.reducer';

const networkSelector = (state: State): NetworkState => state.network;

export const isLoadingSelector = (
  state: State,
  networkLabel: string
): boolean => {
  const network = networkSelector(state);

  return Boolean(network[networkLabel]);
};
