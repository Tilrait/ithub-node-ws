import { WebSocketServer } from 'ws'

import handleConnect from './handlers/handleConnect'
import handleEvents from './handlers/handleEvents'
import handleDisconnect from './handlers/handleDisconnect'

import { connections, messages } from './storage'


const wsServer = new WebSocketServer({ port: 9009 })

const tempUserId = `user-${Date.now()}`;

wsServer.on("connection", (connection) => {
    const newUserId = handleConnect({
      connection,
      connections,
      userJoinedMessage: {
        authorId: "system",
        content: `Пользователь ${tempUserId} вошел в чат`,
        createdAt: Date.now(),
      },
    });



    connection.on("message", (message) => {
        handleEvents({ message, messages, connections, newUserId });
    })

    connection.on("close", () => handleDisconnect({ connections, newUserId }))
})
