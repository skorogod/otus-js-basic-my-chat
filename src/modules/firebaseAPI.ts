import { set, ref, push, child } from "firebase/database";
import { Message } from "./types";
import { app, db } from "./redux/config";


export function addMessageDb(msg: Omit<Message, 'id'>) {
    const messageId = push(child(ref(db), "messages")).key;
    return set(ref(db, "messages/" + messageId), {
        id: messageId,
        text: msg.text,
        dateTime: msg.dateTime
    });
}