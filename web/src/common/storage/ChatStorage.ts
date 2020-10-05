export type OptimisticUpdateStatus = 'merged' | 'sent' | 'pending' | 'failed'

export interface Message {
    id: number
    text: string
    user: User
    timestamp: Date
    optimisticUpdateStatus: OptimisticUpdateStatus
}

export interface User {
    id: number
    name: string
    created: Date
}

export interface ChatDescriptor {
    id: number
    key: string
    name: string
    created: Date
    myUser?: User
}

export interface ChatStorage {
    getMessages(chatKey: string): Message[]

    getMembers(chatKey: string): User[]

    getMyUser(chatKey: string): User

    getOrLoadChatDescriptor(chatKey: string): Promise<ChatDescriptor>

    getChatDescriptor(chatKey: string): ChatDescriptor

    createChat(chatKey: string, name: string): Promise<void>

    joinChat(chatKey: string, userName: string): Promise<void>

    sendMessage(chatKey: string, message: string): void

    subscribe(chatKey: string, callback: () => void): void
}

