import "./styles/styles.scss"

import { fetchMessages } from "./modules/redux/actions";

import { addNewMessage } from "./modules/addNewMessage";
import { store } from "./modules/redux/store";
import { Message } from "./modules/types";
import { addMessageDb } from "./modules/firebaseAPI";

window.onload = function () {
    const sendBtn = document.querySelector('#submit-btn');
    const messages = document.querySelector(".messages-list");

    document.addEventListener('load', store.dispatch(fetchMessages() as any))
    
    if(sendBtn) {
        sendBtn.addEventListener("click", function() {
            const inputMessage = document.querySelector('.message-text') as HTMLTextAreaElement;
            
            if (inputMessage && inputMessage.value) {
                const msg: Omit<Message, 'id'> = {
                    text: inputMessage?.value,
                    dateTime: Date.now()
                }
                addMessageDb(msg)
            };
            
            inputMessage.value = '';
        })
    }

    function renderMessages() {
        const state = store.getState();
        const messagesList: Message[] = state.chatroom.messages;
        const messagesEls = Array.from(document.querySelectorAll('.messages-list .message'));

        const messagesIds = messagesEls.map(el => el.id)
        console.log(messagesIds)

        messagesList.forEach(el => {
            if (!messagesIds.includes(el.id)) {
                addNewMessage(messages as HTMLElement, el.id, el.text)
            }
        }
    )
    }

    store.subscribe(() => renderMessages())

}
