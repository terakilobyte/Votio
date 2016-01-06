import { createAction, handleActions } from 'redux-actions';
import request from 'axios';
// ------------------------------------
// Constants
// ------------------------------------
export const JWT_FAILURE = 'JWT_FAILURE';
export const JWT_SUCCESS = 'JWT_SUCCESS';
export const LOGOUT = 'LOGOUT';

// ------------------------------------
// Actions
// ------------------------------------
export const increment = createAction(COUNTER_INCREMENT, (value = 1) => value);
export const jwtRequest = (dispatch) => {
  return (
    request
      .get('/credentials')
      .then((response) => {
        const user = response.data.user;
        const jwt = response.data.jwt;
        return dispatch(jwtSuccess({user, jwt}));
      })
      .catch((response) => {
        return dispatch(jwtFailure({error: response.data.error}));
      })
  );
};

export const jwtSuccess = createAction(JWT_SUCCESS, (payload) => payload);
export const jwtFailure = createAction(JWT_FAILURE, (payload) => payload);


// This is a thunk, meaning it is a function that immediately
// returns a function for lazy evaluation. It is incredibly useful for
// creating async actions, especially when combined with redux-thunk!
// NOTE: This is solely for demonstration purposes. In a real application,
// you'd probably want to dispatch an action of COUNTER_DOUBLE and let the
// reducer take care of this logic.
export const doubleAsync = () => {
  return (dispatch, getState) => {
    setTimeout(() => {
      dispatch(increment(getState().counter));
    }, 1000);
  };
};

export const actions = {
  increment,
  doubleAsync
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  jwt: null,
  user: null
};
export default handleActions({
  [COUNTER_INCREMENT]: (state, { payload }) => state + payload
}, 1);
