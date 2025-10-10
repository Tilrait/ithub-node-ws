import { WebSocketServer } from 'ws'

import handleConnect from './handlers/handleConnect'
import handleEvents from './handlers/handleEvents'
import handleDisconnect from './handlers/handleDisconnect'

import { connections, messages } from './storage'


const wsServer = new WebSocketServer({ port: 9009 })

wsServer.on("connection", (connection) => {
    const newUserId = handleConnect({ connection, connections })

    connection.on("message", (message) => {
        handleEvents({ message, messages, connections })
    })

    connection.on("close", () => handleDisconnect({ connections, newUserId }))
})
