declare module 'redux-actions' {
  type ActionHandler<State> = (state: State, action: any) => State;

  function handleActions<State>(
    map: { [key: string]: ActionHandler<State> },
    initialState: State
  ): ActionHandler<State>;
}
