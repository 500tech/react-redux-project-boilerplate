// TODO: remove this file if no localization is needed
import { get, set } from 'lodash/fp';
import { handleActions } from 'redux-actions';

import { setLocale } from 'actions/localization';

import * as AT from 'actions/localization';
import { LocaleTypes } from 'constants/locales';

export interface LocalizationState {
  locale: LocaleTypes;
}

const initialState: LocalizationState = {
  locale: 'en-US'
};

const localization = handleActions<LocalizationState>(
  {
    [AT.SET_LOCALE]: (
      state: LocalizationState,
      action: ReturnType<typeof setLocale>
    ): LocalizationState => {
      const locale = get('payload.locale', action);

      return set('locale', locale, state);
    }
  },
  initialState
);

export default localization;
