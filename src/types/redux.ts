import { NetworkState } from 'reducers/network';
import { LocalizationState } from 'reducers/localization';

export type State = {
  network: NetworkState;
  localization: LocalizationState;
};
