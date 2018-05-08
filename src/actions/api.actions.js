// @flow
import { set } from 'lodash/fp';
import type { Action } from 'types/redux.types';
import type { BaseAction, BaseActionWithMeta } from 'types/redux.types';

export type HttpMethod =
  | 'GET'
  | 'POST'
  | 'PUT'
  | 'DELETE'
  | 'PATCH'
  | 'HEAD'
  | 'OPTIONS';

type ApiActionPayload = {|
  +networkLabel: string,
  +method: HttpMethod,
  +path: string,
  +data?: {},
  baseUrl?: string,
  +onSuccess?: (data: any) => Action | Action[],
  +onError?: (data: any) => Action | Action[]
|};

type ApiActionMeta = {|
  +api: true
|};

export type ApiActionInput = BaseAction<ApiActionPayload>;
export type ApiAction = BaseActionWithMeta<ApiActionPayload, ApiActionMeta>;

export const apiAction = (action: ApiActionInput): ApiAction =>
  set('meta.api', true, action);
