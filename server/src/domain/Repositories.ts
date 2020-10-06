import {Chat, Message, User} from "./Entities";

export interface UserRepository {
    get: (id: number) => User
    getByChatId: (chatId: number, afterEventId?: number) => User[]
    add: (name: string, chatId: number, created: Date, avatar: string, eventId: number) => User
    update: (id: number, name: string, eventId: number) => void
}

export interface MessageRepository {
    add: (text: string, userId: number, chatId: number, timestamp: Date, eventId: number) => Message
    getAll: (chatId: number, afterEventId?: number) => Message[]
}

export interface ChatRepository {
    add: (key: string, name: string, created: Date, eventId: number) => void
    get: (id: number) => Chat
    getByKey: (key: string) => Chat
    isKeyAvailable: (key: string) => boolean
}
