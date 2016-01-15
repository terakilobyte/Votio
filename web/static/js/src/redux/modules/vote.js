import { createAction, handleActions } from 'redux-actions';

// ------------------------------------
// Constants
// ------------------------------------
const RECEIVE_TOPIC = 'RECEIVE_TOPIC';
const RECEIVE_VOTE = 'RECEIVE_VOTE';
const RECEIVE_INITIAL_STATE = 'RECEIVE_INITIAL_STATE';
const ASSIGN_VOTE_SOCKET = 'ASSIGN_VOTE_SOCKET';
const PUSH_TOPIC = 'PUSH_TOPIC';
const PUSH_VOTE = 'PUSH_VOTE';

// ------------------------------------
// Actions
// ------------------------------------
export const receiveTopic = createAction(RECEIVE_TOPIC, (payload) => payload);
export const receiveVote = createAction(RECEIVE_VOTE, (payload) => payload);
export const receiveInitialState = createAction(RECEIVE_INITIAL_STATE, (payload) => payload);
export const assignVoteSocket = createAction(ASSIGN_VOTE_SOCKET, (payload) => payload);
export const pushTopic = createAction(PUSH_TOPIC, (payload) => payload);
export const pushVote = createAction(PUSH_VOTE, (payload) => payload);

// Actions for our socket and observables
export const actions = {
  assignVoteSocket,
  receiveTopic,
  receiveVote,
  receiveInitialState,
  pushTopic,
  pushVote
};

// ------------------------------------
// Reducer
// ------------------------------------

const initialState = {
  topics: [],
  summarySocket: null,
  voteSocket: null
};

export default handleActions({

  [RECEIVE_TOPIC]: (state, { payload }) => {
    return Object.assign({}, state, {topics: [...state.topics, payload]});
  },

  [RECEIVE_VOTE]: (state, { payload }) => {
    const topics = state.topics.reduce((acc, curr) => {
      if (curr.data.id === payload.data.id) {
        acc.push(payload);
      } else {
        acc.push(curr);
      }
      return acc;
    }, []);
    return Object.assign({}, state, {topics});
  },

  [RECEIVE_INITIAL_STATE]: (state, { payload }) => {
    return Object.assign({}, state, {topics: payload});
  },
  [ASSIGN_VOTE_SOCKET]: (state, { payload }) => {
    return Object.assign({}, state, {voteSocket: payload});
  },
  [PUSH_TOPIC]: (state, { payload }) => {
    state.voteSocket.push('new_topic', {data: payload});
    return state;
  },
  [PUSH_VOTE]: (state, { payload }) => {
    state.voteSocket.push('vote', {data: payload});
    return state;
  }
}, initialState);
