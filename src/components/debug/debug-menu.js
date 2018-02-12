import * as React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import StateRestorer from 'components/debug/stateRestorer';

type Props = {
  children: React.Node
};

const DebugMenu = ({ children }: Props) => (
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
  opacity: 0.1;
  &:hover {
    opacity: 0.9;
  }
`;

const newNode = document.createElement('div');
document.body.appendChild(newNode);
ReactDOM.render(<DebugMenu />, newNode);
