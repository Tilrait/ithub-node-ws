import { WebSocketServer } from 'ws'

type Message = {
    authorId: string,
    content: string,
    createdAt: number,
}

const wsServer = new WebSocketServer({ port: 9009 })

const connections = new Set()

const messages: Message[] = [
    {
        authorId: "id-1",
        content: "Hi there!",
        createdAt: Date.now()
    },
    {
        authorId: "id-1",
        content: 'Anybody here?',
        createdAt: Date.now()
    }
]

wsServer.on("connection", (connection, request) => {
    connections.add(connection)
    console.log("New connection", request.socket.remoteAddress)

    connection.send(JSON.stringify(messages))

    connection.on("message", message => {
        console.log(message)
    })

    connection.on("close", () => {
        connections.delete(connection)
    })
})
