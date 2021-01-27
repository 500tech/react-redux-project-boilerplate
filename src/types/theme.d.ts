import '@emotion/react';
import { Theme as AppTheme } from '../constants/themes.constants';

declare module '@emotion/react' {
  export interface Theme extends AppTheme {}
}
