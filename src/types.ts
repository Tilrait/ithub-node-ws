import type { UUID } from "node:crypto"
import type { WebSocket } from 'ws'

export type Event = "messages" | "message" | "users" | "user:join"

export type PayloadMessage = {
    authorId: string,
    content: string,
    createdAt: number,
}

export type PayloadUser = UUID

export type Message = {
    type: Event,
    payload: PayloadMessage[] | PayloadUser[] | PayloadMessage | PayloadUser
}

export type Connections = Map<UUID, WebSocket>

export type ConnectOptions = {
    connections: Connections,
    connection: WebSocket
}

export type DisconnectOptions = {
    connections: Connections,
    newUserId: UUID
}

export type EventHandlerOptions = {
    message: Buffer | ArrayBuffer | Buffer[],
    messages: PayloadMessage[],
    connections: Connections,
}