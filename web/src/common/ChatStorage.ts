import {Chat, Message, User} from "./Api";

export interface ChatData {
    meta?: Chat
    myUser?: User & { token: string }
    members?: User[]
    messages?: Message[]
    eventId?: number
}

export interface Subscription {
    chatKey: string
    callback: (data: ChatData) => void
}

export class ChatStorage {
    private subscriptions: Subscription[] = []

    get = (chatKey: string): ChatData | null => {
        const item = window.localStorage.getItem(this.getKey(chatKey))
        return item ? JSON.parse(item) : null
    }

    update = (chatKey: string, data: ChatData) => {
        const item = window.localStorage.getItem(this.getKey(chatKey))

        const current = item ? JSON.parse(item) : {}
        const updated = {
            ...current,
            ...data
        }

        window.localStorage.setItem(this.getKey(chatKey), JSON.stringify(updated))

        this.subscriptions.filter(s => s.chatKey === chatKey).forEach(s => s.callback(updated))
    }

    subscribe = (subscription: Subscription) => this.subscriptions.push(subscription)

    private getKey = (chatKey: string) => `chat_${chatKey}`
}

export const GlobalChatStorage = new ChatStorage()