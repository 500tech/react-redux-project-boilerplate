import { Locale } from 'types/common';
import translations from './en-US.translations.json';

const enUS: Locale = {
  dateTimeFormat: {
    parentLocale: 'en',
    longDateFormat: {
      LT: 'HH:mm',
      L: 'MM/DD/YYYY',
      LL: 'MM/DD/YYYY HH:mm'
    },
    week: {
      dow: 1
    }
  },
  translations
};

export default enUS;
