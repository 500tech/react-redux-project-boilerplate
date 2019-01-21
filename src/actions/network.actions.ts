import { BaseAction } from 'types/base-redux.types';

export const START_NETWORK: string = '[network] Start';
export const END_NETWORK: string = '[network] End';

export interface NetworkAction extends BaseAction {
  payload: {
    networkLabel: string;
  };
}

export const startNetwork = (networkLabel: string): NetworkAction => ({
  type: START_NETWORK,
  payload: {
    networkLabel
  }
});

export const endNetwork = (networkLabel: string): NetworkAction => ({
  type: END_NETWORK,
  payload: {
    networkLabel
  }
});
