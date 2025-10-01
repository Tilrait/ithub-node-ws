const wsUrl = 'ws://localhost:9009'

const connection = new WebSocket(wsUrl)

connection.addEventListener('open', () => {
    console.log('Connected')
})

connection.addEventListener('message', (event) => {
    const data = JSON.parse(event.data)
    console.log(data)
})

connection.addEventListener('error', (error) => {
    console.error(error)
})

connection.addEventListener('close', () => {
    console.log('Connected')
})