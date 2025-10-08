import { randomUUID, type UUID } from 'node:crypto'
import { WebSocketServer, type WebSocket } from 'ws'

type Event = "messages" | "message" | "users" | "user:join"

type PayloadMessage = {
    authorId: string,
    content: string,
    createdAt: number,
}

type PayloadUser = UUID

type Message = {
    type: Event,
    payload: PayloadMessage[] | PayloadUser[] | PayloadMessage | PayloadUser
}

const wsServer = new WebSocketServer({ port: 9009 })

const connections = new Map<UUID, WebSocket>()

const messages: PayloadMessage[] = [
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
    const newUserId = randomUUID()
    // TODO: генерация ID в стиле нелепая-обезьяна, deprecated-being

    connections.set(newUserId, connection)

    const userJoinObject: Message = {
        type: "user:join",
        payload: newUserId
    }

    for (const userConnection of connections.values()) {
        userConnection.send(JSON.stringify(userJoinObject))
    }

    const messagesObject: Message = {
        type: "messages",
        payload: messages
    }

    const usersObject: Message = {
        type: "users",
        payload: [...connections.keys()]
    }

    connection.send(JSON.stringify(messagesObject))
    connection.send(JSON.stringify(usersObject))

    connection.on("message", message => {
        const data = JSON.parse(message.toString())

        const newMessagePayload: PayloadMessage = {
            authorId: "id-2",
            content: data,
            createdAt: Date.now()
        }

        const newMessage: Message = {
            type: 'message',
            payload: newMessagePayload
        }

        messages.push(newMessagePayload)

        for (const client of connections.values()) {
            client.send(JSON.stringify(newMessage))
        }
    })

    connection.on("close", () => {
        connections.delete(newUserId)
    })
})
