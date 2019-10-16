// TODO: remove this file if no localization is needed
import { BaseAction } from 'types/base-redux.types';
import { LocaleTypes } from 'constants/locales';

export const SET_LOCALE: string = '[localization] Set Locale';

export interface SetLocaleAction extends BaseAction {
  payload: {
    locale: string;
  };
}

export const setLocale = (locale: LocaleTypes): SetLocaleAction => ({
  type: SET_LOCALE,
  payload: {
    locale
  }
});
