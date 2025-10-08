/**
 * @param {{ authorId: string, content: string, createdAt: number }} message
 * @returns {undefined}
 */
function renderMessage(message) {
    const messageElement = document.createElement('section')
    messageElement.className = "chat chat-start"

    messageElement.innerHTML = `
        <p class="chat-bubble">
            ${message.content}
        </p>
    `

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
}

const formElement = document.querySelector('.messages__form')
formElement.addEventListener("submit", sendMessage)

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
    } else if (type === "users") {
        renderUsers(payload)
    }


})

connection.addEventListener('error', (error) => {
    console.error(error)
})

connection.addEventListener('close', () => {
    console.log('Connected')
})