// TODO: remove this file if no localization is needed
import { get, set } from 'lodash/fp';
import { handleActions } from 'redux-actions';

import { SetLocaleAction } from 'actions/localization.actions';

import * as AT from 'actions/localization.actions';
import { LocaleTypes } from 'constants/locales';

export interface LocalizationState {
  locale: LocaleTypes;
}

const initialState: LocalizationState = {
  locale: 'en-US'
};

const localizationReducer = handleActions<LocalizationState>(
  {
    [AT.SET_LOCALE]: (
      state: LocalizationState,
      action: SetLocaleAction
    ): LocalizationState => {
      const locale = get('payload.locale', action);

      return set('locale', locale, state);
    }
  },
  initialState
);

export default localizationReducer;
