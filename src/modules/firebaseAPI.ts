import { set, ref, push, child } from "firebase/database";
import { Message } from "./types";
import { app, db } from "./redux/config";

export function insertMessage(msg: Omit<Message, "id">) {
  return new Promise((res, rej) => {
    const messageId = push(child(ref(db), "messages")).key;
    set(ref(db, "messages/" + messageId), {
      id: messageId,
      text: msg.text,
      dateTime: msg.dateTime,
    }).then(() => res(messageId))
      .catch((err) => rej(err))
  })
}
