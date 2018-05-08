// @flow
import type { Match } from 'react-router';

export type Translations = {
  [key: string]: string
};

export type DateTimeFormat = {|
  parentLocale: string,
  longDateFormat: {
    LT: string,
    L: string,
    LL: string
  },
  week: {
    dow: number
  }
|};

export type Locale = {|
  dateTimeFormat: DateTimeFormat,
  translations: Translations
|};

export type TypedMatch<T> = T & Match;
