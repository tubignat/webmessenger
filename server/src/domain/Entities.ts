export interface User {
    id: number
    chatId: number
    name: string
    created: Date
}

export interface Message {
    id: number
    text: string
    userId: number
    chatId: number
    timestamp: Date
}

export interface Chat {
    id: number
    key: string
    name: string
    created: Date
}
