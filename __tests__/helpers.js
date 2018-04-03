import React, { Component } from 'react';

const createFakeStore = (initialState, dispatch = noop) => ({
  dispatch,
  getState() {
    return initialState;
  }
});

export const createMiddlewareDispatcher = middleware => async (
  storeData,
  action,
  dispatcher
) => {
  let dispatched = null;
  const dispatch = middleware(createFakeStore(storeData, dispatcher))(
    actionAttempt => (dispatched = actionAttempt)
  );
  await dispatch(action);
  return dispatched;
};

export function createDummyComponent(name) {
  const dummyComponent = class extends Component {
    render() {
      return <div>{this.props.children}</div>;
    }
  };

  dummyComponent.displayName = name;

  return dummyComponent;
}
