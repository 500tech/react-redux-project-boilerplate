// TODO: Remove me if no need for localization
import { setIntlConfig, withIntl } from 'storybook-addon-intl';

import locales from '../src/constants/locales';

setIntlConfig({
  locales: Object.keys(locales),
  defaultLocale: 'en-US',
  getMessages: (locale) => locales[locale].translations
});

export const decorators = [withIntl];
// END LOCALIZATION TODO
