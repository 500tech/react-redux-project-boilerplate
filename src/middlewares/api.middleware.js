// @flow
import { get, castArray, compact } from 'lodash/fp';
import urljoin from 'url-join';

import apiUtils from 'utils/api.utils';
import { startNetwork, endNetwork } from 'actions/network.actions';

import type { Middleware } from 'types/redux.types';
// import type { Middleware } from 'redux'; doesn't work?

declare var process: any;

// TODO: replace in .env.X to correct URL
export const BASE_URL: string = process.env.REACT_APP_BASE_URL;

const apiMiddleware: Middleware = ({ dispatch, getState }) => {
  const dispatchActions = actions => {
    compact(castArray(actions)).forEach(dispatch);
  };

  return next => action => {
    if (!get('meta.api', action)) {
      return next(action);
    }
    const { payload } = action;
    const { path, url, onSuccess, onError } = payload || {};
    const { networkLabel, data, method = 'GET' } = payload || {};
    const headers = {};
    const requestUrl = url || urljoin(BASE_URL, path);
    // TODO: if using token authentication
    // if (getState().user.token) {
    //   headers['auth'] = getState().user.token;
    // }

    next(action);

    dispatch(startNetwork(networkLabel));

    return apiUtils
      .request({ method, url: requestUrl, data, headers })
      .then(({ body }) => {
        dispatch(endNetwork(networkLabel));

        if (onSuccess) dispatchActions(onSuccess(body));
      })
      .catch(error => {
        console.error('API error', error, action);

        dispatch(endNetwork(networkLabel));

        if (get('response.status', error) === 401) {
          // TODO: handle 401
        }

        if (onError) dispatchActions(onError(error));
      });
  };
};

export default apiMiddleware;
