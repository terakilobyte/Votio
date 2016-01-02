import { combineReducers } from 'redux';
import { routeReducer } from 'redux-simple-router';

export default combineReducers({
  router: routeReducer,
  stateHistory: (state = {}, action) => state
});
