// @flow
import type { LocalizationState } from 'reducers/localization.reducer';
import type { NetworkState } from 'reducers/network.reducer';

export type Action = {|
  type: string,
  payload?: any,
  meta?: {},
  error?: any
|};

/* eslint-disable no-use-before-define */
export type ApiAction = {|
  type: string,
  payload?: {
    networkLabel?: string,
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS',
    data?: {},
    url?: string,
    onSuccess?: (data: any) => Action | Action[],
    onError?: (error: any) => Action | Action[]
  },
  meta?: {
    api: boolean
  },
  error?: any
|};

/* eslint-enable no-use-before-define */
export type ActionCreator = (...any) => Action;
export type ApiActionCreator = (...any) => ApiAction;
export type Dispatch = (action: Action | ApiAction) => any;

export type GetState = () => State;
type Next = (action: Action | ApiAction) => any;
type Store = {
  getState: GetState,
  dispatch: Dispatch
};

export type Middleware = (
  store: Store
) => (next: Next) => (action: Action | ApiAction) => any;

export type State = {
  localization: LocalizationState,
  network: NetworkState
};
