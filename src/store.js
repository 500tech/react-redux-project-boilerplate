import { createStore, compose, applyMiddleware } from 'redux';

import rootReducer from 'reducers/root.reducer';
import apiMiddleware from 'middlewares/api.middleware';

const isDev = process.env.NODE_ENV !== 'production';

const composeEnhancers =
  (isDev && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const middlewares = [apiMiddleware];

if (isDev) {
  middlewares.push(require('redux-freeze'));
}

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middlewares))
);

export default store;
