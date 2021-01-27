import enUS from 'constants/locales/en-US';
import heIL from 'constants/locales/he-IL';
import { Locale } from 'types/common';

export type LocaleTypes = 'en-US' | 'he-IL';

interface LocaleList {
  [key: string]: Locale;
}

const locales: LocaleList = {
  'en-US': enUS,
  'he-IL': heIL
};

export default locales;
