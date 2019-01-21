// TODO: remove this file if no localization is needed
import { BaseAction } from 'types/base-redux.types';

export const SET_LOCALE: string = '[localization] Set Locale';

export interface SetLocaleAction extends BaseAction {
  payload: {
    locale: string;
  };
}

export const setLocale = (locale: string): SetLocaleAction => ({
  type: SET_LOCALE,
  payload: {
    locale
  }
});
