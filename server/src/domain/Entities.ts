export interface User {
    id: number
    chatId: number
    name: string
    created: Date
    eventId: number
}

export interface Message {
    id: number
    text: string
    userId: number
    chatId: number
    timestamp: Date
    eventId: number
}

export interface Chat {
    id: number
    key: string
    name: string
    created: Date
    eventId: number
}

export interface Updates {
    meta?: Chat
    members: User[]
    messages: Message[]
    latestEventId: number
}
