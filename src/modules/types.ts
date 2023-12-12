export type Message = {
  id: string;
  text: string;
  dateTime: number;
};

export interface messageAction extends Message {
  type: "SEND_MESSAGE" | "ADD_MESSAGE";
};

export type addMessageState = Message;