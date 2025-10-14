import type { PayloadMessage, Connections } from './types'

export const connections: Connections = new Map()

export const messages: PayloadMessage[] = []
export const usedNames = new Set<string>()