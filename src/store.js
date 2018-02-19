import { createStore, compose, applyMiddleware } from 'redux';
import { RESTORE_LOCAL_STORAGE_KEY } from 'constants/restore.constants';

import rootReducer from 'reducers/root.reducer';
import apiMiddleware from 'middlewares/api.middleware';

const isDev = process.env.NODE_ENV !== 'production';

const composeEnhancers =
  (isDev && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const middlewares = [apiMiddleware];

if (isDev) {
  middlewares.push(require('redux-freeze'));
}

const savedState = localStorage.getItem(RESTORE_LOCAL_STORAGE_KEY);

const store = createStore(
  rootReducer,
  ...(savedState && isDev ? [JSON.parse(savedState)] : []),
  composeEnhancers(applyMiddleware(...middlewares))
);

export default store;
