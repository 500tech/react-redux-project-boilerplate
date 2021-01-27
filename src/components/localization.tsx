import React from 'react';
import forEach from 'lodash/forEach';
import { connect } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { shouldPolyfill as shouldPolyfillRelativeTimeFormat } from '@formatjs/intl-relativetimeformat/should-polyfill';
import { shouldPolyfill as shouldPolyfillPluralRules } from '@formatjs/intl-pluralrules/should-polyfill';

import locales, { LocaleTypes } from 'constants/locales';
import { State } from 'types/redux';

if (shouldPolyfillPluralRules()) {
  require('@formatjs/intl-pluralrules/polyfill');
}

if (shouldPolyfillRelativeTimeFormat()) {
  require('@formatjs/intl-relativetimeformat/polyfill');
}

// Go over all of the available locales and register them
forEach(locales, (_value, key: string = '') => {
  const localeKey = key.split('-')[0];

  if (!localeKey) {
    return;
  }

  // @ts-ignore
  if (Intl.PluralRules.polyfilled) {
    require(`@formatjs/intl-pluralrules/locale-data/${localeKey}`);
  }

  // @ts-ignore
  if (Intl.RelativeTimeFormat.polyfilled) {
    require(`@formatjs/intl-relativetimeformat/locale-data/${localeKey}`);
  }
});

export const Localization: React.FC<Props> = ({ locale, children }) => (
  <IntlProvider locale={locale} messages={locales[locale].translations}>
    {children}
  </IntlProvider>
);

interface OwnProps {
  children: React.ReactNode;
}

interface StateProps {
  locale: LocaleTypes;
}

export type Props = StateProps & OwnProps;

const mapStateToProps = (state: State): StateProps => ({
  locale: state.localization.locale
});

export default connect(mapStateToProps)(Localization);
