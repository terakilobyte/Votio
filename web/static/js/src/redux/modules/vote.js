import { createAction, handleActions } from 'redux-actions';

// ------------------------------------
// Constants
// ------------------------------------
const RECEIVE_TOPIC = 'RECEIVE_TOPIC';
const RECEIVE_VOTE = 'RECEIVE_VOTE';
const RECEIVE_INITIAL_STATE = 'RECEIVE_INITIAL_STATE';

// ------------------------------------
// Actions
// ------------------------------------
const receiveTopic = createAction(RECEIVE_TOPIC, (payload) => payload);
const receiveVote = createAction(RECEIVE_VOTE, (payload) => payload);
const receiveInitialState = createAction(RECEIVE_INITIAL_STATE, (payload) => payload);


// Actions for our socket and observables
const pushTopic = (payload) => payload;
const pushVote = (payload) => payload;
const handleReceivedTopic = (dispatch, payload) => dispatch(receiveTopic(payload));
const handleReceivedVote = (dispatch, payload) => dispatch(receiveVote(payload));
const handleReceivedInitialState = (dispatch, payload) => dispatch(receiveInitialState(payload));


export const actions = {
  pushTopic,
  pushVote,
  handleReceivedTopic,
  handleReceivedVote,
  handleReceivedInitialState
};

// ------------------------------------
// Reducer
// ------------------------------------

const initialState = {
  topics: [],
  nextID: 0,
  summarySocket: null,
  voteSocket: null
};

export default handleActions({

  [RECEIVE_TOPIC]: (state, { payload }) => {
    payload.id = state.nextId;
    return Object.assign({}, state, {topics: [...state.topics, payload], nextId: state.nextID + 1});
  },

  [RECEIVE_VOTE]: (state, { payload }) => {
    const topics = state.topics.reduce((acc, curr) => {
      if (curr.title === payload.title) {
        acc.push(payload);
      } else {
        acc.push(curr);
      }
      return acc;
    }, []);
    return Object.assign({}, state, topics);
  },

  [RECEIVE_INITIAL_STATE]: (state, { payload }) => {
    const nextID = payload.topics.length;
    return Object.assign({}, state, payload, {nextID});
  }
}, initialState);
