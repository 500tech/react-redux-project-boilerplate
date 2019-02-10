import { createSelector } from 'reselect';
import { some, castArray } from 'lodash/fp';

import { State } from 'types/redux.types';
import { NetworkState } from 'reducers/network.reducer';

const networkSelector = (state: State): NetworkState => state.network;

export const isLoadingSelector = createSelector(
  networkSelector,
  (_state: State, networkLabel: string | string[]) => networkLabel,
  (network: NetworkState, networkLabel: string | string[]) => {
    const labels = castArray(networkLabel);

    return some(currentLabel => network[currentLabel] > 0, labels);
  }
);
