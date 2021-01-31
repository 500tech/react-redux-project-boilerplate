import { createSelector } from 'reselect';
import { some, castArray } from 'lodash/fp';

import { State } from 'types/redux';

// TODO: make into selector factory
export const makeIsLoadingSelector = (networkLabel: string | string[]) =>
  createSelector(
    (state: State) => state.network,
    (network) => {
      const labels = castArray(networkLabel);

      return some((currentLabel) => network[currentLabel] > 0, labels);
    }
  );
