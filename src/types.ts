import type { WebSocket } from 'ws'

export type Event = "messages" | "message" | "users" | "user:join"

export type PayloadMessage = {
    authorId: string,
    content: string,
    createdAt: number,
}

export type PayloadUser = string

export type Message = {
    type: Event,
    payload: PayloadMessage[] | PayloadUser[] | PayloadMessage | PayloadUser
    userJoinedMessage?: PayloadMessage
}

export type Connections = Map<string, WebSocket>

export type ConnectOptions = {
  connections: Connections;
  connection: WebSocket;
  userJoinedMessage: PayloadMessage;
};

export type DisconnectOptions = {
    connections: Connections,
    newUserId: string,
}

export type EventHandlerOptions = {
  message: Buffer | ArrayBuffer | Buffer[];
  messages: PayloadMessage[];
  connections: Connections;
  newUserId: string;
};