import { combineReducers } from 'redux';
import { routeReducer } from 'redux-simple-router';
import auth from './modules/auth';

export default combineReducers({
  auth,
  router: routeReducer,
  stateHistory: (state = {}, action) => state
});
