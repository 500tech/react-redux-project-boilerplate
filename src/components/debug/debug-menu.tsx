import * as React from 'react';
import ReactDOM from 'react-dom';
import styled from '@emotion/styled';

import StateRestorer from 'components/debug/state-restorer';

const DebugMenu = () => (
  <DebugMenuWrapper>
    <StateRestorer />
  </DebugMenuWrapper>
);

const DebugMenuWrapper = styled.div`
  position: absolute;
  right: 0;
  top: 2px;
  display: flex;
  flex-direction: row-reverse;
  color: black;
`;

const newNode = document.createElement('div');
document.body.appendChild(newNode);
ReactDOM.render(<DebugMenu />, newNode);
