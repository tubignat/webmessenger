import {ChatRepository, MessageRepository, UserRepository} from "../domain/Repositories";
import {Chat, Message, User} from "../domain/Entities";


class Sequence {
    private current = -1

    get(): number {
        this.current++
        return this.current
    }
}

export class InMemoryUserRepository implements UserRepository {
    private users: User[] = []
    private sequence = new Sequence()

    add(name: string, created: Date): number {
        const newUser: User = {
            id: this.sequence.get(),
            name: name,
            created: created
        }
        this.users.push(newUser)

        return newUser.id;
    }

    get(id: number): User {
        const user = this.users.find(u => u.id === id)
        if (!user) {
            throw Error(`No user with id ${id} found`)
        }

        return user
    }

    update(id: number, name: string): void {
        const index = this.users.findIndex(u => u.id === id)
        if (index === -1) {
            throw Error(`No user with id ${id} found`)
        }

        this.users[index].name = name
    }
}

export class InMemoryMessageRepository implements MessageRepository {
    private messages: Message[] = []
    private sequence = new Sequence()

    add(text: string, userId: number, chatId: number, timestamp: Date): number {
        const newMessage: Message = {
            id: this.sequence.get(),
            text: text,
            userId: userId,
            chatId: chatId,
            timestamp: timestamp
        }
        this.messages.push(newMessage)

        return newMessage.id;
    }

    getAfter(chatId: number, id: number): Message[] {
        return this.messages.filter(m => m.chatId === chatId && m.id > id);
    }

    getAll(chatId: number): Message[] {
        return this.messages.filter(m => m.chatId === chatId);
    }
}

export class InMemoryChatRepository implements ChatRepository {
    private chats: Chat[] = []
    private sequence = new Sequence()

    add(key: string, created: Date): void {
        if (this.chats.some(c => c.key === key)) {
            throw Error(`Chat with key ${key} already exists`)
        }

        const newChat: Chat = {
            id: this.sequence.get(),
            key: key,
            created: created
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

}