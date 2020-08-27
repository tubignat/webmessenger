import {ChatRepository, MessageRepository, UserRepository} from "./Repositories";
import {User} from "./Entities";

export class ChatService {
    constructor(private userRepository: UserRepository, private msgRepository: MessageRepository, private chatRepository: ChatRepository) {
    }

    isKeyAvailable = (key: string) => this.chatRepository.isKeyAvailable(key)

    createChat = (key: string, name: string) => {
        this.chatRepository.add(key, name, new Date())
    }

    loadChat = (key: string) => {
        const chat = this.chatRepository.getByKey(key)
        const messages = this.msgRepository.getAll(chat.id)

        return {
            chat: chat,
            messages: messages
        }
    }

    loadChatMeta = (key: string) => this.chatRepository.getByKey(key)

    joinChat = (chatId: number, name: string): User => this.userRepository.add(name, chatId, new Date())

    getMembers = (chatId: number): User[] => this.userRepository.getByChatId(chatId)

    loadNewMessages = (key: string, lastMessageId: number) => {
        const chat = this.chatRepository.getByKey(key)
        return this.msgRepository.getAfter(chat.id, lastMessageId)
    }

    sendMessage = (key: string, text: string, userId: number) => {
        const chat = this.chatRepository.getByKey(key)
        this.msgRepository.add(text, userId, chat.id, new Date())
    }
}