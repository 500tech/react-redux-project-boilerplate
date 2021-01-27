import { css, Global } from '@emotion/react';
import React from 'react';

const globalStyles = css`
  body {
    margin: 0;
    padding: 0;
    font-family: sans-serif;
  }
`;

export const GlobalStyles = () => <Global styles={globalStyles} />;
