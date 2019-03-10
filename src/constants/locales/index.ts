import enUS from 'constants/locales/en-US';
import {Locale} from "../../types/common.types";

export type LocaleTypes = 'en-US';

interface LocaleList {
  [key:string]: Locale
}

const locales: LocaleList = {
  'en-US': enUS,
};

export default locales;
