import * as React from 'react';
import forEach from 'lodash/forEach';
import { connect } from 'react-redux';
import { IntlProvider } from 'react-intl';
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

if (!Intl.PluralRules) {
  require('@formatjs/intl-pluralrules/polyfill');
}

// @ts-ignore
if (!Intl.RelativeTimeFormat) {
  require('@formatjs/intl-relativetimeformat/polyfill');
}

// Go over all of the available locales and register them
forEach(locales, (_value, key: string = '') => {
  const localeKey = key.split('-')[0];

  if (!localeKey) {
    return;
  }

  require(`@formatjs/intl-pluralrules/dist/locale-data/${localeKey}`);
  require(`@formatjs/intl-relativetimeformat/dist/locale-data/${localeKey}`);
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
