import { message, messages } from "../modules/redux/reducers/messages";
import { Message } from "../modules/types";
import { store } from "../modules/redux/store";
import { push } from "firebase/database";
import * as firebaseAPI from "../modules/firebaseAPI";
import { addMessage } from "../modules/redux/actions";

beforeEach(() => {
  jest.clearAllMocks();
});

function generateRandomString(length: number) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

describe("message reducer", () => {
  test(`message reducer returns new state when action
            " with action type ADD MESSAGE dispathing`, () => {
    const state = store.getState();
    let newState;
    newState = message(state, { type: "FETCH_MESSAGE" });
    expect(state).toEqual(newState);

    const msg: Message = {
      id: "fkngekgmgjg39jg",
      text: "test",
      dateTime: 1234567,
    };
    const action = { type: "ADD_MESSAGE", payload: msg };
    newState = message(state, action);
    expect(state).not.toEqual(newState);
  });
});

describe("messages reducer", () => {
  test(`messages reducer add new message object to state 
            if action.type is ADD_MESSAGE and this message object is not in state
            `, () => {
    let state = store.getState();
    console.log(state);
    let newState;
    const messagesArray: Omit<Message, "id">[] = [];

    for (let i = 0; i < 5; i++) {
      messagesArray.push({
        text: generateRandomString(10),
        dateTime: Date.now(),
      });
    }

    let msg = messagesArray[0];

    const spy = jest.spyOn(firebaseAPI, "insertMessage");
    spy.mockResolvedValue(generateRandomString(5));

    store.dispatch(addMessage(msg));
    newState = store.getState() as any;

    expect(newState).not.toEqual(state);
    expect(newState.chatroom.messages[0]).toEqual(msg);

    //Пытаемся добавить сообщение повторно, состояние не должно меняться
    store.dispatch(addMessage(msg));
    expect(newState).toEqual(store.getState());
  });
});
