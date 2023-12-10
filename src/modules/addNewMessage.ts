export function addNewMessage(
    container: HTMLElement, id: string | number, text: string): void {
        const messageHtml = getMessageHtml(id, text);
        container.innerHTML += `\n${messageHtml}`
}

function getMessageHtml(id: string | number, text: string): string {

    return `<article class='message-container'>
                <p id="${id}" class='message'>
                    ${text}
                </p>
            </article>    
            `
}