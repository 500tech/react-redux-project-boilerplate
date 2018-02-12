// @flow
// TODO: remove this file if no localization is needed
import type { ActionCreator } from 'types/redux.types';

export const SET_LOCALE: string = '[localization] Set Locale';

export const setLocale: ActionCreator = (locale: string) => ({
  type: SET_LOCALE,
  payload: {
    locale
  }
});
