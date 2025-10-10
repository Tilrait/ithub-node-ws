import type { DisconnectOptions } from "../types"

export default function handleDisconnect({ connections, newUserId }: DisconnectOptions) {
    connections.delete(newUserId)
}