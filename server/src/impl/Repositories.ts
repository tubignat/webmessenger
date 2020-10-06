import {ChatRepository, MessageRepository, UserRepository} from "../domain/Repositories";
import {Chat, Message, User} from "../domain/Entities";
import {InMemorySequence} from "./InMemorySequence";

export class InMemoryUserRepository implements UserRepository {
    private users: User[] = []
    private sequence = new InMemorySequence()

    add(name: string, chatId: number, created: Date, avatar: string, eventId: number): User {
        const newUser: User = {
            id: this.sequence.get(),
            name: name,
            created: created,
            chatId: chatId,
            avatar: avatar,
            eventId: eventId
        }
        this.users.push(newUser)

        return newUser
    }

    get(id: number): User {
        const user = this.users.find(u => u.id === id)
        if (!user) {
            throw Error(`No user with id ${id} found`)
        }

        return user
    }

    getByChatId(chatId: number, afterEventId?: number): User[] {
        const evtId = afterEventId ?? -1
        return this.users.filter(u => u.chatId === chatId && u.eventId > evtId)
    }

    update(id: number, name: string, eventId: number): void {
        const index = this.users.findIndex(u => u.id === id)
        if (index === -1) {
            throw Error(`No user with id ${id} found`)
        }

        this.users[index].name = name
        this.users[index].eventId = eventId
    }
}

export class InMemoryMessageRepository implements MessageRepository {
    private messages: Message[] = []
    private sequence = new InMemorySequence()

    add(text: string, userId: number, chatId: number, timestamp: Date, eventId: number): Message {
        const newMessage: Message = {
            id: this.sequence.get(),
            text: text,
            userId: userId,
            chatId: chatId,
            timestamp: timestamp,
            eventId: eventId
        }
        this.messages.push(newMessage)

        return newMessage;
    }

    getAll(chatId: number, afterEventId?: number): Message[] {
        const evtId = afterEventId ?? -1
        return this.messages.filter(m => m.chatId === chatId && m.eventId > evtId);
    }
}

export class InMemoryChatRepository implements ChatRepository {
    private chats: Chat[] = []
    private sequence = new InMemorySequence()

    add(key: string, name: string, created: Date, eventId: number): void {
        if (this.chats.some(c => c.key === key)) {
            throw Error(`Chat with key ${key} already exists`)
        }

        const newChat: Chat = {
            id: this.sequence.get(),
            key: key,
            created: created,
            name: name,
            eventId: eventId
        }
        this.chats.push(newChat)
    }

    get(id: number): Chat {
        const chat = this.chats.find(u => u.id === id)
        if (!chat) {
            throw Error(`No chat with id ${id} found`)
        }

        return chat
    }

    getByKey(key: string): Chat {
        const chat = this.chats.find(u => u.key === key)
        if (!chat) {
            throw Error(`No chat with key ${key} found`)
        }

        return chat
    }

    isKeyAvailable(key: string): boolean {
        return !this.chats.some(c => c.key === key)
    }
}