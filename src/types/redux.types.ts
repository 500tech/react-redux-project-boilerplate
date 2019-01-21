import { NetworkState } from 'reducers/network.reducer';
import { LocalizationState } from 'reducers/localization.reducer';

export type State = {
  network: NetworkState;
  localization: LocalizationState;
};
