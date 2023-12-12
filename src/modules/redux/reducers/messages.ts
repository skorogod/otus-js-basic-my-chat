import { Reducer } from "redux";
import { addMessageState } from "../../types";

export const message:Reducer= (state: addMessageState, action) => {
  switch (action.type) {
    case "ADD_MESSAGE":
      return {
        id: action.id,
        text: action.text,
        datetime: action.dateTime,
      };
    default:
      return state;
  }
};

export const messages: Reducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_MESSAGE":
      if (state.map((m: addMessageState) => m.id).includes(action.id)) {
        return state;
      } else {
        return [...state, message(undefined, action)];
      }
    default:
      return state;
  }
};

export default messages;
