// @flow
import { combineReducers } from 'redux';

import network from 'reducers/network.reducer';
import localization from 'reducers/localization.reducer'; // TODO: remove if no localization

export const reducersMap = {
  network,
  localization // TODO: remove if no localization
};

export default combineReducers(reducersMap);
