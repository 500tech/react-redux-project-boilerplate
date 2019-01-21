import { get, castArray, compact } from 'lodash/fp';
import urljoin from 'url-join';
import { Dispatch, Store } from 'redux';

import apiUtils from 'utils/api.utils';
import { startNetwork, endNetwork } from 'actions/network.actions';
import { BaseAction } from 'types/base-redux.types';
import { State } from 'types/redux.types';
import { BASE_URL } from 'constants/config';
import * as Logger from 'utils/logger';

export function dispatchActions(
  dispatch: Dispatch<State>,
  actions: BaseAction | BaseAction[]
) {
  compact(castArray(actions)).forEach(action => dispatch(action));
}

export function apiMiddleware({ dispatch }: Store<State>) {
  return (next: Dispatch<State>) => async (action: BaseAction) => {
    if (!get('meta.api', action)) {
      return next(action);
    }

    const { payload } = action;
    const {
      path,
      baseUrl,
      onSuccess,
      onError,
      networkLabel,
      data,
      method
    } = payload;
    const headers = {};
    const requestUrl = urljoin(baseUrl || BASE_URL, path);
    // TODO: if using token authentication
    // if (getState().user.token) {
    //   headers['auth'] = getState().user.token;
    // }

    next(action);
    dispatch(startNetwork(networkLabel));

    try {
      const response = await apiUtils.request({
        method,
        url: requestUrl,
        data,
        headers
      });

      if (onSuccess) {
        dispatchActions(dispatch, onSuccess(response.body || response.text));
      }

      dispatch(endNetwork(networkLabel));
    } catch (error) {
      Logger.error('API error', error, action);

      if (get('response.status', error) === 401) {
        // TODO: handle 401
      }

      if (onError) {
        dispatchActions(dispatch, onError(error));
      }
      dispatch(endNetwork(networkLabel));
    }
  };
}

export default apiMiddleware;
