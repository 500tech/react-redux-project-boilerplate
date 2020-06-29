import { addDecorator } from '@storybook/react';

// TODO: Remove me if no need for localization
import { setIntlConfig, withIntl } from 'storybook-addon-intl';

import locales from '../src/constants/locales';
import moment from 'moment';
import forEach from 'lodash/forEach';

forEach(locales, (locale, key) =>
  moment.defineLocale(key, locale.dateTimeFormat)
);

setIntlConfig({
  locales: Object.keys(locales),
  defaultLocale: 'en-US',
  getMessages: (locale) => locales[locale].translations
});

addDecorator(withIntl);
// END LOCALIZATION TODO
