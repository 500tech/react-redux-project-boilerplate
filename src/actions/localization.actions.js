// @flow
// TODO: remove this file if no localization is needed
import type { BaseAction } from 'types/redux.types';

export const SET_LOCALE: string = '[localization] Set Locale';

export type SetLocaleAction = BaseAction<{|
  +locale: string
|}>;
export type LocalizationAction = SetLocaleAction;

export const setLocale = (locale: string): SetLocaleAction => ({
  type: SET_LOCALE,
  payload: {
    locale
  }
});
