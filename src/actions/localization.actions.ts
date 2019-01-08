// TODO: remove this file if no localization is needed
import { BaseAction } from 'types/base-redux.types';

export const SET_LOCALE: string = '[localization] Set Locale';

export interface SetLocaleActionPayload {
  locale: string;
}

export type SetLocaleAction = BaseAction<SetLocaleActionPayload>;
export type LocalizationAction = SetLocaleAction;

export const setLocale = (locale: string): SetLocaleAction => ({
  type: SET_LOCALE,
  payload: {
    locale
  }
});
