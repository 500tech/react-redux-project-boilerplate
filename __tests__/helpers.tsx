import React, { Component } from 'react';
import { noop } from 'lodash/fp';

const createFakeStore = (initialState: any, dispatch = noop) => ({
  dispatch,
  getState() {
    return initialState;
  }
});

export const createMiddlewareDispatcher = (middleware: Function) => async (
  storeData: any,
  action: any,
  dispatcher: any
) => {
  let dispatched = null;
  const dispatch = middleware(createFakeStore(storeData, dispatcher))(
      (actionAttempt: any) => (dispatched = actionAttempt)
  );
  await dispatch(action);
  return dispatched;
};

export function createDummyComponent(name: string) {
  const dummyComponent: React.ComponentClass = class extends Component {
    render() {
      return <div>{this.props.children}</div>;
    }
  };

  dummyComponent.displayName = name;

  return dummyComponent;
}
