import { BaseAction } from 'types/base-redux.types';

export const START_NETWORK: string = '[network] Start';
export const END_NETWORK: string = '[network] End';

interface StartNetworkActionPayload {
  networkLabel: string;
}
export type StartNetworkAction = BaseAction<StartNetworkActionPayload>;
export type EndNetworkAction = StartNetworkAction;
export type NetworkAction = StartNetworkAction | EndNetworkAction;

export const startNetwork = (networkLabel: string): StartNetworkAction => ({
  type: START_NETWORK,
  payload: {
    networkLabel
  }
});
export const endNetwork = (networkLabel: string): EndNetworkAction => ({
  type: END_NETWORK,
  payload: {
    networkLabel
  }
});
