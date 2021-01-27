import { Locale } from 'types/common';
import translations from './he-IL.translations.json';

const heIL: Locale = {
  dateTimeFormat: {
    parentLocale: 'he',
    longDateFormat: {
      LT: 'HH:mm',
      L: 'DD/MM/YYYY',
      LL: 'DD/MM/YYYY HH:mm'
    },
    week: {
      dow: 1
    }
  },
  translations
};

export default heIL;
