const baseURL = 'http://localhost:4000'

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

export interface User {
    id: number
    name: string
    created: Date
}

export interface LoadChatResponse {
    chat: any
    messages: Message[]
}

export interface JoinChatResponse {
    user: User
    token: string
    members: User[]
}

export const Api = {
    createChat: (key: string, name: string) => {
        return fetch(`${baseURL}/api/createChat`, {
            method: 'POST',
            body: JSON.stringify({key: key, name: name})
        })
    },

    sendMessage: (key: string, userId: number, text: string) => {
        return fetch(`${baseURL}/api/sendMessage`, {
            method: 'POST',
            body: JSON.stringify({key: key, userId: userId, text: text})
        })
    },

    joinChat: (chatId: number, name: string): Promise<JoinChatResponse> => {
        return fetch(`${baseURL}/api/joinChat`, {
            method: 'POST',
            body: JSON.stringify({chatId: chatId, name: name})
        }).then(response => response.json())
    },

    loadChat: (key: string): Promise<LoadChatResponse> => {
        return fetch(`${baseURL}/api/loadChat?key=${key}`).then(response => response.json())
    },

    loadChatMeta: (key: string): Promise<Chat> => {
        return fetch(`${baseURL}/api/loadChatMeta?key=${key}`).then(response => response.json())
    },

    isKeyAvailable: (key: string): Promise<boolean> => {
        return fetch(`${baseURL}/api/isKeyAvailable?key=${key}`).then(response => response.json())
    },

    loadNewMessages: (key: string, lastMessageId: number): Promise<Message[]> => {
        return fetch(`${baseURL}/api/loadNewMessages?key=${key}&lastMessageId=${lastMessageId}`).then(response => response.json())
    }
}