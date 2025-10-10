import { randomUUID } from 'node:crypto'

import { messages } from '../storage'
import type { Message, ConnectOptions } from '../types'


export default function handleConnect({ connections, connection }: ConnectOptions) {
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

    return newUserId
}