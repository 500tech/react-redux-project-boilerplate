// @flow
import { createSelector } from 'reselect';
import { some, castArray } from 'lodash/fp';

import type { State } from 'types/redux.types';
import type { NetworkState } from 'reducers/network.reducer';

const networkSelector = (state: State): NetworkState => state.network;

export const isLoadingSelector = createSelector(
  networkSelector,
  (state, networkLabel) => networkLabel,
  (network: NetworkState, networkLabel: string | Array<string>) => {
    const labels = castArray(networkLabel);

    return some(currentLabel => network[currentLabel] > 0, labels);
  }
);
