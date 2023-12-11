import { Dispatch } from "redux";
import {
  ref,
  onValue,
  query,
  orderByKey,
  limitToLast,
} from "firebase/database";
import { db } from "../config";

export const addMessage = (msg: any) => ({
  type: "ADD_MESSAGE",
  ...msg,
});

export const setUserName = (name: String) => ({
  type: "SET_USER_NAME",
  name: name,
});

export const startFetchingMessages = {
  type: "START_FETCHING_MESSAGES",
};

export const receivedMessages = () => ({
  type: "RECEIVED_MESSAGES",
  receivedAt: Date.now(),
});

export const fetchMessages = () => {
  return function (dispatch: any, getState: any) {
    dispatch(startFetchingMessages);

    const messagesRef = ref(db, "messages");

    onValue(
      query(messagesRef, orderByKey(), limitToLast(20)),
      (snapshot: any) => {
        setTimeout(() => {
          const messages = snapshot.val() || [];
          dispatch(receiveMessages(messages));
        }, 0);
      },
    );
  };
};

export const receiveMessages = (messages: []) => {
  return function (dispatch: Dispatch) {
    Object.values(messages).forEach((msg) => dispatch(addMessage(msg)));
    dispatch(receivedMessages());
  };
};
