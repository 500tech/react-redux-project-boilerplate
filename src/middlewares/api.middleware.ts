// @flow
import { get, castArray, compact } from 'lodash/fp';
import urljoin from 'url-join';

import apiUtils from 'utils/api.utils';
import { startNetwork, endNetwork } from 'actions/network.actions';
import { ApiAction, ApiActionPayload } from 'actions/api.actions';
import { BaseAction } from 'types/base-redux.types';
import { Middleware } from 'types/redux.types';

declare var process: any;

// TODO: replace in .env.X to correct URL
export const BASE_URL: string = process.env.REACT_APP_BASE_URL;

const apiMiddleware: Middleware = ({ dispatch }) => {
  const dispatchActions = (
    actions: BaseAction<any> | Array<BaseAction<any>>
  ) => {
    compact(castArray(actions)).forEach(action => dispatch(action));
  };

  return next => action => {
    if (!get('meta.api', action)) {
      return next(action);
    }

    const { payload } = action as ApiAction;
    const {
      path,
      baseUrl,
      onSuccess,
      onError,
      networkLabel,
      data,
      method = 'GET'
    } = payload as ApiActionPayload;
    const headers = {};
    const requestUrl = urljoin(baseUrl || BASE_URL, path);
    // TODO: if using token authentication
    // if (getState().user.token) {
    //   headers['auth'] = getState().user.token;
    // }

    next(action);

    dispatch(startNetwork(networkLabel));

    apiUtils
      .request({ method, url: requestUrl, data, headers })
      .then(({ body }) => {
        if (onSuccess) {
          dispatchActions(onSuccess(body));
        }

        dispatch(endNetwork(networkLabel));
      })
      .catch(error => {
        console.error('API error', error, action);

        if (get('response.status', error) === 401) {
          // TODO: handle 401
        }

        if (onError) {
          dispatchActions(onError(error));
        }
        dispatch(endNetwork(networkLabel));
      });
  };
};

export default apiMiddleware;
