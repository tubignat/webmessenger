const baseURL = 'http://localhost:4000'

export interface MessageContract {
    id: number
    text: string
    userId: number
    chatId: number
    timestamp: Date
}

export interface ChatContract {
    id: number
    key: string
    name: string
    created: Date
}

export interface UserContract {
    id: number
    name: string
    created: Date
}

export interface JoinChatResponse {
    user: UserContract
    token: string
}

export interface LoadUpdatesResponse {
    meta?: ChatContract
    members: UserContract[]
    messages: MessageContract[]
    latestEventId: number
}

export const Api = {
    createChat: (key: string, name: string) => {
        return fetch(`${baseURL}/api/createChat`, {
            method: 'POST',
            body: JSON.stringify({key: key, name: name})
        })
    },

    sendMessage: (key: string, userId: number, text: string): Promise<MessageContract> => {
        return fetch(`${baseURL}/api/sendMessage`, {
            method: 'POST',
            body: JSON.stringify({key: key, userId: userId, text: text})
        }).then(response => response.json())
    },

    joinChat: (chatId: number, name: string): Promise<JoinChatResponse> => {
        return fetch(`${baseURL}/api/joinChat`, {
            method: 'POST',
            body: JSON.stringify({chatId: chatId, name: name})
        }).then(response => response.json())
    },

    loadChatMeta: (key: string): Promise<ChatContract> => {
        return fetch(`${baseURL}/api/loadChatMeta?key=${key}`).then(response => response.json())
    },

    isKeyAvailable: (key: string): Promise<boolean> => {
        return fetch(`${baseURL}/api/isKeyAvailable?key=${key}`).then(response => response.json())
    },

    loadUpdates: (chatId: number, afterEventId: number): Promise<LoadUpdatesResponse> => {
        return fetch(`${baseURL}/api/loadUpdates?chatId=${chatId}&afterEventId=${afterEventId}`).then(response => response.json())
    }
}