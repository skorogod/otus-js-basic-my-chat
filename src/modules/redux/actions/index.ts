import messages from "../reducers/messages";
import { Dispatch } from "redux";
import {
  ref,
  onValue,
  query,
  orderByKey,
  limitToLast,
} from "firebase/database";
import { app, db } from "../config";
import { getAuth, signInAnonymously } from "firebase/auth";



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

// export const login = () => {
//   return (dispatch: any) => {
//     dispatch(startAuthorizing());
//     const auth = getAuth(app);
//     signInAnonymously(auth).then(() => {
//       dispatch(userAuthorized());
//       dispatch(fetchMessages());
//     });
//   };
// };

// export const startAuthorizing = () => ({
//   type: "USER_START_AUTHORIZING",
// });

// export const userAuthorized = () => ({
//   type: "USER_AUTHORIZED",
// });
