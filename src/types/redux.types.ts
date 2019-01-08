import { LocalizationState } from 'reducers/localization.reducer';
import { NetworkState } from 'reducers/network.reducer';
import { NetworkAction } from 'actions/network.actions';
import { LocalizationAction } from 'actions/localization.actions';
import { ApiAction } from 'actions/api.actions';
import { SampleAction } from '../sample/sample.actions'; // TODO: remove sample action

export type Action =
  | NetworkAction
  | LocalizationAction // TODO: remove if not needed
  | SampleAction // TODO: remove
  | ApiAction;

export type State = {
  network: NetworkState;
  localization: LocalizationState; // TODO: remove if no localization
};

export type Dispatch = (action: Action) => any;

export type GetState = () => State;
type Next = (action: Action) => any;
interface Store {
  getState: GetState;
  dispatch: Dispatch;
}

export type Middleware = (
  store: Store
) => (next: Next) => (action: Action) => any;
