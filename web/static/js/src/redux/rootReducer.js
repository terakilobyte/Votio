import { combineReducers } from 'redux';
import { routeReducer } from 'redux-simple-router';
import auth from './modules/auth';
import alerts from './modules/alerts';
import vote from './modules/vote';

export default combineReducers({
  vote,
  alerts,
  auth,
  router: routeReducer,
  stateHistory: (state = {}, action) => state
});
