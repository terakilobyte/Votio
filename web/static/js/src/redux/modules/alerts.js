import { createAction, handleActions } from 'redux-actions';

// ------------------------------------
// Constants
// ------------------------------------
export const ALERT_SUCCESS = 'ALERT_SUCCESS';
export const ALERT_ERROR = 'ALERT_ERROR';
export const ALERT_INFO = 'ALERT_INFO';
export const DISMISS_ALERT = 'DISMISS_ALERT';

// ------------------------------------
// Actions
// ------------------------------------
export const alertSuccess = createAction(ALERT_SUCCESS, (payload) => payload);
export const alertInfo = createAction(ALERT_INFO, (payload) => payload);
export const alertError = createAction(ALERT_ERROR, (payload) => payload);
export const dismissAlert = createAction(DISMISS_ALERT, (payload) => payload);

export const actions = {
  alertSuccess,
  alertInfo,
  alertError,
  dismissAlert
};

// ------------------------------------
// Reducer
// ------------------------------------

const initialState = {
  success: '',
  errors: [],
  info: '',
  lastID: 0
};

export default handleActions({
  [ALERT_SUCCESS]: (state, { payload }) => {
    return Object.assign({}, state, payload);
  },
  [ALERT_INFO]: (state, { payload } ) => {
    return Object.assign({}, state, payload);
  },
  [ALERT_ERROR]: (state, { payload }) => {
    let newID, errors;
    newID = state.lastID + 1;
    errors = state.errors.concat({error: payload.error, id: newID});
    return Object.assign({}, state, {errors: errors}, {lastID: newID});
  },
  [DISMISS_ALERT]: (state, { payload }) => {
    switch (payload.type) {
    case 'success':
      return Object.assign({}, state, { success: '' });
    case 'info':
      return Object.assign({}, state, { info: '' });
    case 'error':
      let errors;
      errors = state.errors.filter(elem => elem.id !== payload.id);
      return Object.assign({}, state, { errors: errors });
    default:
      return state;
    }
  }
}, initialState);
