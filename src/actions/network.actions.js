// @flow
import type { ActionCreator } from 'types/redux.types';

export const START_NETWORK: string = '[network] Start';
export const END_NETWORK: string = '[network] End';

export const startNetwork: ActionCreator = (networkLabel: string) => ({
  type: START_NETWORK,
  payload: {
    networkLabel
  }
});

export const endNetwork: ActionCreator = (networkLabel: string) => ({
  type: END_NETWORK,
  payload: {
    networkLabel
  }
});
