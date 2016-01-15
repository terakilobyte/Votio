import { createAction, handleActions } from 'redux-actions';
import request from 'axios';
import Cookies from 'js-cookie';
import {alertSuccess, alertError } from './alerts';
// ------------------------------------
// Constants
// ------------------------------------
export const JWT_FAILURE = 'JWT_FAILURE';
export const JWT_SUCCESS = 'JWT_SUCCESS';
export const LOGOUT = 'LOGOUT';

// ------------------------------------
// Actions
// ------------------------------------
export const jwtSuccess = createAction(JWT_SUCCESS, (payload) => payload);
export const jwtFailure = createAction(JWT_FAILURE, (payload) => payload);
export const jwtDispatch = (dispatch, history, token) => {
  return (
    request
      .get('/credentials')
      .then((response) => {
        const user = response.data.user;
        const jwt = token;
        history.push('/');
        dispatch(alertSuccess({success: 'Successfully signed in.'}));
        return dispatch(jwtSuccess({user, jwt}));
      })
      .catch((response) => {
        console.log('error', response);
        history.push('/');
        dispatch(alertError({error: response.error}));
        return dispatch(jwtFailure({authFailed: true}));
      })
  );
};

export const getJWTToken = () => JSON.parse(Cookies.get('votio')).jwt;


export const logout = createAction(LOGOUT, () => {
  return {
    user: null,
    authenticated: null,
    error: null,
    authFailed: false
  };
});

export const actions = {
  jwtSuccess,
  jwtFailure,
  logout
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  user: Cookies.get('votio') && JSON.parse(Cookies.get('votio')).user || null,
  authenticated:
  Cookies.get('votio') && JSON.parse(Cookies.get('votio')).jwt
    ? true
    : false,
  error: null,
  authFailed: false
};

export default handleActions({
  [JWT_SUCCESS]: (state, { payload }) => {
    Cookies.set('votio', payload, {expires: 30});
    return Object.assign({}, state, {user: payload, authenticated: true});
  },
  [JWT_FAILURE]: (state, { payload }) => {
    return Object.assign({}, state, payload);
  },
  [LOGOUT]: (state, { payload }) => {
    Cookies.remove('votio');
    return Object.assign({}, state, payload);
  }
}, initialState);
