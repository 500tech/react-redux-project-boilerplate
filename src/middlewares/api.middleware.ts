import {get, castArray, compact} from 'lodash/fp';
import urljoin from 'url-join';
import {Dispatch, Store, ActionCreator} from 'redux';

import apiUtils from 'utils/api.utils';
import {startNetwork, endNetwork} from 'actions/network.actions';
import {BaseAction} from 'types/base-redux.types';
import {State} from 'types/redux.types';
import {BASE_URL} from 'constants/config';
import * as logger from 'utils/logger';

export function dispatchActions(
  dispatch: Dispatch<BaseAction>,
  actionCreators: ActionCreator<BaseAction> | ActionCreator<BaseAction>[],
  response: any
) {
  compact(castArray(actionCreators)).forEach((actionCreator: ActionCreator<BaseAction>) => {
    const action = actionCreator(response);

    return action && dispatch(action);
  });
}

export function apiMiddleware({dispatch}: Store<State>) {
  return (next: Dispatch<BaseAction>) => async (action: BaseAction) => {
    if (!get('meta.api', action)) {
      return next(action);
    }

    const {payload} = action;
    const {
      path,
      baseUrl,
      onSuccess,
      onError,
      networkLabel,
      data,
      method
    } = payload;
    const headers: { [key: string]: string } = {};
    const requestUrl = urljoin(baseUrl || BASE_URL, path);

    // TODO: if using token authentication
    // if (getState().auth) {
    //   headers['Authorization'] = getState().auth.token;
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
        dispatchActions(dispatch, onSuccess, response.data || response.text);
      }

      dispatch(endNetwork(networkLabel));
    } catch (error) {
      logger.error('API error', error, action);

      if (get('response.status', error) === 401) {
        // TODO: handle 401
      }

      if (onError) {
        dispatchActions(dispatch, onError, error);
      }
      dispatch(endNetwork(networkLabel));
    }
  };
}

export default apiMiddleware;
