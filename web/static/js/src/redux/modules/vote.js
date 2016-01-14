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
const receiveTopic = createAction(RECEIVE_TOPIC, (payload) => payload);
const receiveVote = createAction(RECEIVE_VOTE, (payload) => payload);
const receiveInitialState = createAction(RECEIVE_INITIAL_STATE, (payload) => payload);
const assignVoteSocket = createAction(ASSIGN_VOTE_SOCKET, (payload) => payload);
const pushTopic = createAction(PUSH_TOPIC, (payload) => payload);
const pushVote = createAction(PUSH_VOTE, (payload) => payload);

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
    payload.id = state.nextId;
    return Object.assign({}, state, {topics: [...state.topics, payload]});
  },

  [RECEIVE_VOTE]: (state, { payload }) => {
    const topics = state.topics.reduce((acc, curr) => {
      if (curr.id === payload.id) {
        acc.push(payload);
      } else {
        acc.push(curr);
      }
      return acc;
    }, []);
    return Object.assign({}, state, topics);
  },

  [RECEIVE_INITIAL_STATE]: (state, { payload }) => {
    return Object.assign({}, state, payload);
  },
  [ASSIGN_VOTE_SOCKET]: (state, { payload }) => {
    return Object.assign({}, state, {votesocket: payload});
  },
  [PUSH_TOPIC]: (state, { payload }) => {
    const socket = state.voteSocket;
    socket.push(payload);
    return state;
  },
  [PUSH_TOPIC]: (state, { payload }) => {
    const socket = state.voteSocket;
    socket.push(payload);
    return state;
  }
}, initialState);
