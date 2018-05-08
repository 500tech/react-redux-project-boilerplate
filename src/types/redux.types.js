// @flow
import type { LocalizationState } from 'reducers/localization.reducer';
import type { NetworkState } from 'reducers/network.reducer';
import type { NetworkAction } from 'actions/network.actions';
import type { LocalizationAction } from 'actions/localization.actions';
import type { ApiAction } from 'actions/api.actions';
import type { SampleAction } from '../sample/sample.actions'; // TODO: remove sample action

export type BaseAction<PayloadType = any> = {|
  +type: string,
  +payload: PayloadType
|};

export type BaseActionWithMeta<PayloadType = any, MetaType = any> = {|
  +type: string,
  +payload: PayloadType,
  +meta: MetaType
|};

export type Action =
  | NetworkAction
  | LocalizationAction // TODO: remove if not needed
  | SampleAction // TODO: remove
  | ApiAction;

export type State = {
  network: NetworkState,
  localization: LocalizationState // TODO: remove if no localization
};

export type Dispatch = (action: Action) => any;

export type GetState = () => State;
type Next = (action: Action) => any;

export type Middleware = ({
  getState: GetState,
  dispatch: Dispatch
}) => (next: Next) => (action: Action) => any;
