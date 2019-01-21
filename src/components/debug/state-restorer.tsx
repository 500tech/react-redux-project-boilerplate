import * as React from 'react';
import styled from '@emotion/styled';
import store from 'store';

import { RESTORE_LOCAL_STORAGE_KEY } from 'constants/restore.constants';

const RestoreButton = styled.button`
  width: 8em;
  padding: 2px 5px;
  border: none;
  border-radius: 5px;
  margin-right: 5px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  color: white;
  text-transform: uppercase;
  font-weight: 500;
  opacity: 0.1;
  &:hover {
    opacity: 0.9;
  }
`;

const ClearButton = styled(RestoreButton)`
  background: linear-gradient(to top, #d04e4d, #ff605e);
  ${({ disabled }) => (disabled ? 'opacity: 0.3;' : '')} &:active {
    background: linear-gradient(to top, #ff605e, #d04e4d);
  }
  opacity: ${({ disabled }) => (disabled ? 0.1 : 0.9)};
  &:hover {
    opacity: ${({ disabled }) => (disabled ? 0.5 : 0.9)};
  }
`;

const SaveButton = styled(RestoreButton)`
  background: linear-gradient(to top, #583289, #7844bb);
  &:active {
    background: linear-gradient(to top, #7844bb, #583289);
  }
`;

const get = () => localStorage.getItem(RESTORE_LOCAL_STORAGE_KEY);
const clear = () => localStorage.removeItem(RESTORE_LOCAL_STORAGE_KEY);
const save = () =>
  localStorage.setItem(
    RESTORE_LOCAL_STORAGE_KEY,
    JSON.stringify(store.getState())
  );

class StateRestorer extends React.Component<{}, {}> {
  state = {
    clearable: get()
  };

  clear = () => {
    clear();
    this.setState({
      clearable: false
    });
  };

  save = () => {
    save();
    this.setState({
      clearable: true
    });
  };

  render() {
    return (
      <>
        <ClearButton disabled={!this.state.clearable} onClick={this.clear}>
          Clear State
        </ClearButton>
        <SaveButton onClick={this.save}>Save State</SaveButton>
      </>
    );
  }
}

export default StateRestorer;
