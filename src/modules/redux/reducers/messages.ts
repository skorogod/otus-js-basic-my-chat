import { Reducer } from "redux";

type addMessageState = {
  id: BigInt;
  text: String;
  time: Date;
  author: BigInt;
};

const message: Reducer = (state: addMessageState, action) => {
  switch (action.type) {
    case "ADD_MESSAGE":
      return {
        id: action.id,
        text: action.text,
        time: action.time,
        author: action.author,
      };

    default:
      return state;
  }
};

const messages: Reducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_MESSAGE":
      console.log(action);
      if (state.map((m: addMessageState) => m.id).includes(action.id)) {
        return state;
      } else {
        return [...state, message(undefined, action)];
      }
    case "SEND_MESSAGE":
      return [...state, message(undefined, action)];
    default:
      return state;
  }
};

export default messages;
