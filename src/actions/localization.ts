// TODO: remove this file if no localization is needed
import { BaseAction } from 'types/base-redux';
import { LocaleTypes } from 'constants/locales';

export const SET_LOCALE: string = '[localization] Set Locale';

export interface SetLocaleAction extends BaseAction {
  payload: {
    locale: string;
  };
}

export const setLocale = (locale: LocaleTypes) => ({
  type: SET_LOCALE,
  payload: {
    locale
  }
});
