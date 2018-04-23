// @flow
import { set } from 'lodash/fp';
import type { ApiAction } from 'types/redux.types';

export const apiAction = (action: ApiAction): ApiAction =>
  set('meta.api', true, action);
