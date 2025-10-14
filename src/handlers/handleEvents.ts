import type { Message, PayloadMessage, EventHandlerOptions } from "../types"

export default function handleEvents({
  message,
  messages,
  connections,
  newUserId,
}: EventHandlerOptions) {
  const data = JSON.parse(message.toString());

  const newMessagePayload: PayloadMessage = {
    authorId: newUserId,
    content: data,
    createdAt: Date.now(),
  };

  const newMessage: Message = {
    type: "message",
    payload: newMessagePayload,
  };

  messages.push(newMessagePayload);

  for (const client of connections.values()) {
    client.send(JSON.stringify(newMessage));
  }
}