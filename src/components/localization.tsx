import * as React from 'react';
import forEach from 'lodash/forEach';
import { connect } from 'react-redux';
import { IntlProvider, addLocaleData, Locale } from 'react-intl';
import moment, { LocaleSpecification } from 'moment';

import store from 'store';

import locales, { LocaleTypes } from 'constants/locales';

import { State } from 'types/redux.types';

forEach(locales, (locale, key) =>
  moment.defineLocale(
    key,
    (locale.dateTimeFormat as unknown) as LocaleSpecification
  )
);

// Go over all of the available locales and register them
forEach(locales, (_value, key: string) => {
  addLocaleData(({
    locale: key,
    // Couldn't find any documentation about 'pluralRuleFunction', throws error if not present
    pluralRuleFunction: () => {}
  } as unknown) as Locale);
});

export const Localization = ({ locale, children }: Props) => (
  <IntlProvider
    locale={locale}
    key={locale}
    messages={locales[locale].translations}>
    {children}
  </IntlProvider>
);

interface OwnProps {
  children: React.ReactNode;
}

interface StateProps {
  locale: LocaleTypes;
}

type Props = StateProps & OwnProps;

const mapStateToProps = (state: State): StateProps => ({
  locale: state.localization.locale
});

let currentLocale = (store.getState() as State).localization.locale;

moment.locale(currentLocale);
store.subscribe(() => {
  const newLocale = (store.getState() as State).localization.locale;

  if (newLocale !== currentLocale) {
    currentLocale = newLocale;
    moment.locale(currentLocale);
  }
});

export default connect(mapStateToProps)(Localization);
