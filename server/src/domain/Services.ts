import {Chat, Updates, Message, User} from "./Entities";

export interface ChatService {
    isKeyAvailable: (key: string) => boolean
    createChat: (key: string, name: string) => void
    loadChatMeta: (key: string) => Chat
    joinChat: (chatId: number, name: string) => User
    getMembers: (chatId: number) => User[]
    sendMessage: (key: string, text: string, userId: number) => Message
    loadUpdates: (chatId: number, afterEventId: number) => Updates
}