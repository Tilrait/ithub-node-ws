
import { messages, usedNames } from "../storage";
import type { Message, ConnectOptions } from '../types'
import { generateMonkeyID } from '../utils/generateId'


export default function handleConnect({ connections, connection }: ConnectOptions) {
    const newUserId = generateMonkeyID(usedNames);
    usedNames.add(newUserId)
    // TODO: генерация ID в стиле нелепая-обезьяна, deprecated-being
    

    connections.set(newUserId, connection)

    const userJoinObject: Message = {
        type: "user:join",
        payload: newUserId
    }

    const messagesObject: Message = {
        type: "messages",
        payload: messages.slice(-20) // Это срез массива messages который возвращает последние 20 элементов массива.
    }

    const usersObject: Message = {
        type: "users",
        payload: [...connections.keys()]
    }

    connection.send(JSON.stringify(messagesObject))
    connection.send(JSON.stringify(usersObject))

    for (const userConnection of connections.values()) {
      userConnection.send(JSON.stringify(userJoinObject));
    }

    return newUserId
}