import { store } from "./redux/store";
import { Message } from "./types";

export function renderMessages(container: HTMLElement) {
  const state = store.getState();
  const messagesList: Message[] = state.chatroom.messages;
  const messagesEls = Array.from(
    document.querySelectorAll(".messages-list .message"),
  );

  const messagesIds = messagesEls.map((el) => el.id);
  messagesList.forEach((el) => {
    if (!messagesIds.includes(el.id)) {
      renderMessage(container, el.id, el.text);
    }
  });
}

export function renderMessage(
  container: HTMLElement,
  id: string | number,
  text: string,
): void {
  const messageHtml = getMessageHtml(id, text);
  container.innerHTML += `\n${messageHtml}`;
}

function getMessageHtml(id: string | number, text: string): string {
  return `<article class='message-container'>
                <p id="${id}" class='message'>
                    ${text}
                </p>
            </article>    
            `;
}
