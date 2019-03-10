import {addDecorator, configure} from '@storybook/react';
import { addParameters } from '@storybook/react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

// TODO: Remove me if no need for localization
// @ts-ignore
import { setIntlConfig, withIntl } from 'storybook-addon-intl';
import { addLocaleData, Locale } from 'react-intl';

import locales, { LocaleTypes } from 'constants/locales';
import moment, { LocaleSpecification } from 'moment';
import forEach from "lodash/forEach";

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

setIntlConfig({
  locales: Object.keys(locales),
  defaultLocale: 'en-US',
  getMessages: (locale: string) => locales[locale].translations
});

addDecorator(withIntl);
// END LOCALIZATION TODO

addParameters({ viewport: INITIAL_VIEWPORTS });

const req = require.context('../src/stories', true, /\.stories\.tsx?$/);

function loadStories() {
  req.keys().forEach(filename => {
    console.log(filename);
    return req(filename);
  });
}

configure(loadStories, module);
