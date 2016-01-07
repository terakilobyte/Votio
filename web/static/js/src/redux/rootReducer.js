import { combineReducers } from 'redux';
import { routeReducer } from 'redux-simple-router';
import auth from './modules/auth';
import alerts from './modules/alerts';

export default combineReducers({
  alerts,
  auth,
  router: routeReducer,
  stateHistory: (state = {}, action) => state
});
