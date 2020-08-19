import {ChatRepository, MessageRepository, UserRepository} from "./Repositories";

export class ChatService {
    constructor(private userRepository: UserRepository, private msgRepository: MessageRepository, private chatRepository: ChatRepository) {
    }

    createChat = (key: string) => {
        this.chatRepository.add(key, new Date())
    }

    loadChat = (key: string) => {
        const chat = this.chatRepository.getByKey(key)
        const messages = this.msgRepository.getAll(chat.id)

        return {
            chat: chat,
            messages: messages
        }
    }

    loadNewMessages = (key: string, lastMessageId: number) => {
        const chat = this.chatRepository.getByKey(key)
        return this.msgRepository.getAfter(chat.id, lastMessageId)
    }

    sendMessage = (key: string, text: string, userId: number) => {
        const chat = this.chatRepository.getByKey(key)
        this.msgRepository.add(text, userId, chat.id, new Date())
    }
}