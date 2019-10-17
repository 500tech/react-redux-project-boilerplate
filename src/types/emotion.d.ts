import { StyledTags } from '@emotion/styled';
import { Theme as ThemeType } from 'constants/themes.constants';

declare module '@emotion/styled' {
  export interface CreateStyled<Theme extends object = any>
    extends BaseCreateStyled<Theme>,
      StyledTags<Theme> {}

  declare const styled: CreateStyled<ThemeType>;
  export default styled;
}
