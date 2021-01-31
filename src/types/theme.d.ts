import '@emotion/react';
import { theme } from '../constants/themes.constants';

type AppTheme = typeof theme;

declare module '@emotion/react' {
  export interface Theme extends AppTheme {}
}
