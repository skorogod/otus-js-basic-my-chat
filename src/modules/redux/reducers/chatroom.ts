import { combineReducers, Reducer } from "redux";

import messages from "./messages";

const initialState = {
  isFetching: false,
  lastFetched: null,
  height: 0,
};

const meta: Reducer = (state = initialState, action) => {
  switch (action.type) {
    case "START_FETCHING_MESSAGES":
      return Object.assign({}, state, {
        isFetching: true,
      });
    case "RECEIVED_MESSAGES":
      return Object.assign({}, state, {
        isFetching: false,
        lastFetched: action.receivedAt,
      });
    case "UPDATE_MESSAEGES_HEIGHT":
      return Object.assign({}, state, {
        height: action.height,
      });
    default:
      return state;
  }
};

const chatroom = combineReducers({ messages, meta });

export default chatroom;
