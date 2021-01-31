import React, { useEffect } from 'react';
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

export const Localization: React.FC<Props> = ({ locale, children }) => {
  useEffect(
    function loadLocaleData() {
      const [localeKey] = locale.split('-');

      if (!localeKey) {
        return;
      }

      // polyfilled is a property that only exists on the polyfill version of this Intl API.
      // We ignore it's type error as it doesn't exist on the official type and we do not want to extend the interface with
      // a non standard property
      // @ts-ignore
      if (Intl.PluralRules.polyfilled) {
        require(`@formatjs/intl-pluralrules/locale-data/${localeKey}`);
      }

      // polyfilled is a property that only exists on the polyfill version of this Intl API.
      // We ignore it's type error as it doesn't exist on the official type and we do not want to extend the interface with
      // a non standard property
      // @ts-ignore
      if (Intl.RelativeTimeFormat.polyfilled) {
        require(`@formatjs/intl-relativetimeformat/locale-data/${localeKey}`);
      }
    },
    [locale]
  );

  return (
    <IntlProvider locale={locale} messages={locales[locale].translations}>
      {children}
    </IntlProvider>
  );
};

interface StateProps {
  locale: LocaleTypes;
}

export type Props = StateProps;

const mapStateToProps = (state: State): StateProps => ({
  locale: state.localization.locale
});

export default connect(mapStateToProps)(Localization);
