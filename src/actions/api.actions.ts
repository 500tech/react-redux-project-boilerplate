import { BaseAction } from 'types/base-redux.types';

export type HttpMethod =
  | 'get'
  | 'post'
  | 'put'
  | 'delete'
  | 'patch'
  | 'head'
  | 'options';

type OnSuccess<ResponseBody> = (data: ResponseBody) => BaseAction;
type OnError = (error: any) => void;

export interface ApiAction<ResponseBody> extends BaseAction {
  meta: {
    api: true;
  };
  payload: {
    networkLabel: string;
    method: HttpMethod;
    path: string;
    data?: any;
    baseUrl?: string;
    onSuccess: OnSuccess<ResponseBody> | OnSuccess<ResponseBody>[];
    onError?: OnError | OnError[];
  };
}
