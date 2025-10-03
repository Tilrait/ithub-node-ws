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

    const messages = Array.isArray(data) ? data : [data]

    for (const message of messages) {
        renderMessage(message)
    }
})

connection.addEventListener('error', (error) => {
    console.error(error)
})

connection.addEventListener('close', () => {
    console.log('Connected')
})