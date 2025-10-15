/**
 * @param {{ authorId: string, content: string, createdAt: number }} message
 * @returns {undefined}
 */
function renderMessage(message) {
    const messageElement = document.createElement('section')
    const isOwnMessage = message.authorId === currentUserName
    messageElement.className = isOwnMessage ? "chat chat-end" : "chat chat-start"
    const bubbleClass = isOwnMessage ? "chat-bubble chat-bubble-primary" : "chat-bubble"

    messageElement.innerHTML = `
    <div class="chat-header">
        ${message.authorId}
    </div>
        <p class="${bubbleClass}">
            ${message.content}
        </p>
    `;

    const mainElement = document.querySelector('.messages')
    mainElement.prepend(messageElement)
}

function renderUsers(users) {
    const usersElement = document.querySelector('.users')

    for (const user of users) {
        const userElement = document.createElement("button")
        userElement.className = "user list_row"
        userElement.innerText = user

        usersElement.append(userElement)
    }
}

function sendMessage(event) {
    event.preventDefault()
    const formElement = event.target
    const newMessage = formElement.elements.newMessage.value
    connection.send(JSON.stringify(newMessage))
    formElement.reset();
}

const formElement = document.querySelector('.messages__form')
formElement.addEventListener("submit", sendMessage)
let currentUserName = null
const wsUrl = 'ws://localhost:9009'

const connection = new WebSocket(wsUrl)

connection.addEventListener('open', () => {
    console.log('Connected')
})

connection.addEventListener('message', (event) => {
    const data = JSON.parse(event.data)
    const { type, payload } = data

    if (type === "messages") {
        const messages = Array.isArray(payload) ? payload : [payload]

        for (const message of messages) {
            renderMessage(message)
        }
    } else if (type === "message") {
        renderMessage(payload)
    } else if (type === "users") {
        if (!currentUserName) {
            currentUserName = payload[payload.length-1]
        }
        renderUsers(payload)
    }


})

connection.addEventListener('error', (error) => {
    console.error(error)
})

connection.addEventListener('close', () => {
    console.log('Connected')
})