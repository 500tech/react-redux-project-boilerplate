import { set } from 'lodash/fp';
import { Action } from 'types/redux.types';
import { BaseAction, BaseActionWithMeta } from 'types/base-redux.types';

export type HttpMethod =
  | 'GET'
  | 'POST'
  | 'PUT'
  | 'DELETE'
  | 'PATCH'
  | 'HEAD'
  | 'OPTIONS';

export interface ApiActionPayload {
  networkLabel: string;
  method: HttpMethod;
  path: string;
  data?: {};
  baseUrl?: string;
  onSuccess?: (data: any) => Action | Action[];
  onError?: (data: any) => Action | Action[];
}

interface ApiActionMeta {
  api: true;
}

export type ApiActionInput = BaseAction<ApiActionPayload>;
export type ApiAction = BaseActionWithMeta<ApiActionPayload, ApiActionMeta>;

export const apiAction = (action: ApiActionInput): ApiAction =>
  set('meta.api', true, action) as ApiAction;
