import {ChatDescriptor, ChatStorage, Message, OptimisticUpdateStatus, User} from "./ChatStorage";
import {Api, MessageContract} from "../Api";

type MyUser = User & { token: string }

interface ChatStorageUnit {
    id: number
    key: string
    name: string
    created: Date
    members: User[]
    myUser?: MyUser
    messages: Message[]
    latestEventId: number
    lastUpdate: Date
}

interface Subscription {
    chatKey: string
    callback: () => void
}

class ChatStorageImpl implements ChatStorage {
    private readonly units: ChatStorageUnit[]
    private subscriptions: Subscription[] = []

    constructor() {
        this.units = Object.keys(window.localStorage)
            .filter(key => key.startsWith("chat_"))
            .map(key => {
                const item = window.localStorage.getItem(key)
                const unit = item ? JSON.parse(item) as ChatStorageUnit : null
                if (unit) {
                    unit.messages.forEach(msg => {
                        msg.timestamp = new Date(msg.timestamp)
                    })
                }

                return unit
            })
            .filter(unit => !!unit) as ChatStorageUnit[]
    }

    getChatDescriptor(chatKey: string): ChatDescriptor {
        const unit = this.units.find(u => u.key === chatKey)
        if (!unit) {
            throw Error(`No chat with key ${chatKey}`)
        }

        return unit
    }

    getMembers(chatKey: string): User[] {
        const unit = this.units.find(u => u.key === chatKey)
        if (!unit) {
            throw Error(`No chat with key ${chatKey}`)
        }

        return unit.members
    }

    getMessages(chatKey: string): Message[] {
        const unit = this.units.find(u => u.key === chatKey)
        if (!unit) {
            throw Error(`No chat with key ${chatKey}`)
        }

        return unit.messages
    }

    getMyUser(chatKey: string): User {
        const unit = this.units.find(u => u.key === chatKey)
        if (!unit || !unit.myUser) {
            throw Error(`No chat with key ${chatKey}`)
        }

        return unit.myUser
    }

    async createChat(chatKey: string, name: string): Promise<void> {
        const resp = await Api.createChat(chatKey, name)
        if (!resp.ok) {
            throw Error(resp.status.toString())
        }
    }

    async getOrLoadChatDescriptor(chatKey: string): Promise<ChatDescriptor> {
        const unit = this.units.find(u => u.key === chatKey)
        if (unit) {
            return unit
        }

        const resp = await Api.loadChatMeta(chatKey)
        const newUnit = {
            id: resp.id,
            key: resp.key,
            created: resp.created,
            name: resp.name,
            messages: [],
            members: [],
            latestEventId: -1,
            lastUpdate: new Date()
        }

        this.units.push(newUnit)
        this.save(chatKey, newUnit)

        return newUnit
    }

    async joinChat(chatKey: string, userName: string): Promise<void> {
        const index = this.units.findIndex(u => u.key === chatKey)
        if (index === -1) {
            throw Error(`No chat with key ${chatKey}`)
        }
        const resp = await Api.joinChat(this.units[index].id, userName)

        this.units[index] = {
            ...this.units[index],
            myUser: {
                ...resp.user,
                token: resp.token
            }
        }

        this.save(chatKey, this.units[index])
    }

    sendMessage(chatKey: string, message: string): void {
        const unit = this.units.find(u => u.key === chatKey)
        if (!unit || !unit.myUser) {
            throw Error(`No chat with key ${chatKey}`)
        }

        const newMessage = {
            id: unit.messages.length !== 0 ? unit.messages[unit.messages.length - 1].id + 1 : 0,
            text: message,
            user: unit.myUser,
            timestamp: new Date(),
            optimisticUpdateStatus: 'pending' as OptimisticUpdateStatus
        }

        unit.messages = unit.messages.concat(newMessage)

        this.save(chatKey, unit)
        this.notify(chatKey)

        Api
            .sendMessage(unit.key, unit.myUser.id, message)
            .then(msg => {
                newMessage.id = msg.id
                newMessage.timestamp = new Date(msg.timestamp)
                newMessage.optimisticUpdateStatus = 'sent'

                unit.messages = [...unit.messages]

                this.save(chatKey, unit)
                this.notify(chatKey)
            })
            .catch(reason => {
                console.error(reason)
                newMessage.optimisticUpdateStatus = 'failed'
                unit.messages = [...unit.messages]

                this.save(chatKey, unit)
                this.notify(chatKey)
            })
    }

    subscribe(chatKey: string, callback: () => void): void {
        this.startLoadingUpdates(chatKey)
        this.subscriptions.push({chatKey: chatKey, callback: callback})
    }

    private notify(chatKey: string) {
        console.log(`Notifying ${this.subscriptions.filter(sub => sub.chatKey === chatKey).length} subscribers`)
        this.subscriptions.forEach(sub => sub.chatKey === chatKey && sub.callback())
    }

    private startLoadingUpdates(chatKey: string) {
        const unit = this.units.find(u => u.key === chatKey)
        if (!unit) {
            throw Error(`No chat with key ${chatKey}`)
        }

        Api
            .loadUpdates(unit.id, unit.latestEventId)
            .then(r => {
                unit.latestEventId = r.latestEventId

                if (r.meta) {
                    unit.id = r.meta.id
                    unit.key = r.meta.key
                    unit.name = r.meta.name
                    unit.created = r.meta.created
                }

                if (r.members.length !== 0) {
                    unit.members = unit.members ? unit.members.concat(r.members) : r.members
                }

                if (r.messages.length !== 0) {
                    unit.messages = this.mergeMessages(unit, r.messages)
                }

                if (r.meta || r.messages.length !== 0 || r.members.length !== 0) {
                    unit.lastUpdate = new Date()
                    this.notify(chatKey)
                }

                this.save(chatKey, unit)

                setTimeout(() => this.startLoadingUpdates(chatKey), 2000)
            })
    }

    private mergeMessages(unit: ChatStorageUnit, messages: MessageContract[]): Message[] {
        const newMessages = messages.map(msgContract => {
            const user = unit.members?.find(m => m.id === msgContract.userId)
            if (!user) {
                console.error(`Could not find userId ${msgContract.userId} among chat members`)
                return null
            }
            return {
                id: msgContract.id,
                text: msgContract.text,
                timestamp: new Date(msgContract.timestamp),
                optimisticUpdateStatus: 'merged',
                user: user
            }
        }).filter(m => !!m) as Message[]

        const sentMessages = unit.messages?.filter(m => m.optimisticUpdateStatus === 'sent') ?? []
        sentMessages.forEach(m => {
            if (newMessages.find(receivedMsg => m.id === receivedMsg.id)) {
                m.optimisticUpdateStatus = 'merged'
            }
        })

        const messagesToConcat = newMessages.filter(
            receivedMsg => !sentMessages.find(m => m.id === receivedMsg.id)
        )

        return unit.messages ? unit.messages.concat(messagesToConcat) : newMessages
    }

    private save(chatKey: string, unit: ChatStorageUnit) {
        window.localStorage.setItem(`chat_${chatKey}`, JSON.stringify(unit))
    }
}

export const GlobalChatStorage: ChatStorage = new ChatStorageImpl()