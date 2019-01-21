import { match } from 'react-router';

export interface Translations {
  [key: string]: string;
}

export interface DateTimeFormat {
  parentLocale: string;
  longDateFormat: {
    LT: string;
    L: string;
    LL: string;
  };
  week: {
    dow: number;
  };
}

export interface Locale {
  dateTimeFormat: DateTimeFormat;
  translations: Translations;
}

export type TypedMatch<T> = T & match;
