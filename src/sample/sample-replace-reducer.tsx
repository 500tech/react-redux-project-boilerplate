import { combineReducers } from 'redux';

import store from 'store';
import { reducersMap } from 'reducers/root';
import sample from 'sample/sample.reducer';

/*
 * This is done to avoid contaminating the original code with the sample reducer's code
 * Do not use this pattern normally
 */
const newReducer = combineReducers({
  ...reducersMap,
  sample
});

// @ts-ignore
store.replaceReducer(newReducer);
