import type { PayloadMessage, Connections } from './types'

export const connections: Connections = new Map()

export const messages: PayloadMessage[] = [
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
