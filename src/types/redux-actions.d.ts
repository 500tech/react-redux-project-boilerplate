declare module 'redux-actions' {
  type ActionHandler<S> = (state: S, action: any) => S;
  function handleActions<S>(
    map: { [key: string]: ActionHandler<S> },
    initialState: S
  );
}
