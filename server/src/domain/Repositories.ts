import {Chat, Message, User} from "./Entities";

export interface UserRepository {
    get: (id: number) => User
    add: (name: string, created: Date) => number
    update: (id: number, name: string) => void
}

export interface MessageRepository {
    add: (text: string, userId: number, chatId: number, timestamp: Date) => number
    getAll: (chatId: number) => Message[]
    getAfter: (chatId: number, id: number) => Message[]
}

export interface ChatRepository {
    add: (key: string, created: Date) => void
    get: (id: number) => Chat
    getByKey: (key: string) => Chat
}
