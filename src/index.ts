import "./styles/styles.scss";
import "emoji-picker-element";

import { store } from "./modules/redux/store";

import { renderMessage, renderMessages } from "./modules/renderMessage";
import { fetchMessages } from "./modules/redux/actions";
import { Message } from "./modules/types";
import { insertMessage } from "./modules/firebaseAPI";

window.onload = function () {
  const inputMessage = document.querySelector(
    ".message-text",
  ) as HTMLTextAreaElement;
  const sendBtn = document.querySelector("#submit-btn");
  const messages = document.querySelector(".messages-list") as HTMLElement;
  const emojiBtn = document.querySelector(".emoji-btn");
  const emojiPicker = document.querySelector("#emoji-picker");

  document.addEventListener("load", store.dispatch(fetchMessages() as any));

  if (emojiBtn && emojiPicker) {
    emojiPicker.addEventListener("emoji-click", (event: any) => {
      inputMessage.value += event.detail.unicode;
    });

    emojiBtn.addEventListener("click", function () {
      if (emojiPicker.classList.contains("hidden")) {
        emojiPicker.classList.remove("hidden");
      } else {
        emojiPicker.classList.add("hidden");
      }
    });
  }

  if (messages) {
    store.subscribe(() => renderMessages(messages));
  }

  if (sendBtn) {
    sendBtn.addEventListener("click", function () {
      const inputMessage = document.querySelector(
        ".message-text",
      ) as HTMLTextAreaElement;

      if (inputMessage && inputMessage.value) {
        const msg: Omit<Message, "id"> = {
          text: inputMessage?.value,
          dateTime: Date.now(),
        };
        insertMessage(msg);
      }

      inputMessage.value = "";
    });
  }
};
