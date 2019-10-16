import styled, { CreateStyled } from '@emotion/styled';

const theme = {
  primaryColor: '#FFF',
  secondaryColor: '#333'
};

export type Theme = typeof theme;

export default styled as CreateStyled<Theme>;
export { theme };
