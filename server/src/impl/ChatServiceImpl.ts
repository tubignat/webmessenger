import {ChatRepository, MessageRepository, UserRepository} from "../domain/Repositories";
import {Chat, Message, User} from "../domain/Entities";
import {ChatService} from "../domain/Services";
import {EventsIdSequence} from "./EventsIdSequence";

export class ChatServiceImpl implements ChatService {
    constructor(private userRepository: UserRepository, private msgRepository: MessageRepository, private chatRepository: ChatRepository) {
    }

    isKeyAvailable = (key: string) => this.chatRepository.isKeyAvailable(key)

    createChat = (key: string, name: string) => {
        this.chatRepository.add(key, name, new Date(), EventsIdSequence.get())
    }

    loadChatMeta = (key: string) => this.chatRepository.getByKey(key)

    joinChat = (chatId: number, name: string): User => {
        const avatarColors = [
            '#88C18E', '#9374D6', '#76B2D3', '#E9AFAF', '#4C8663', '#DE0000', '#B0AFE9', '#AFDBE9', '#DFD600', '#007AFF',
            '#AFE9D4', '#00D8F5', '#903737'
        ]

        const userNumber = this.userRepository.getByChatId(chatId).length
        return this.userRepository.add(name, chatId, new Date(), avatarColors[userNumber], EventsIdSequence.get())
    }

    getMembers = (chatId: number): User[] => this.userRepository.getByChatId(chatId)

    sendMessage = (key: string, text: string, userId: number): Message => {
        const chat = this.chatRepository.getByKey(key)
        return this.msgRepository.add(text, userId, chat.id, new Date(), EventsIdSequence.get())
    }

    loadUpdates = (chatId: number, afterEventId: number) => {
        const chat = this.chatRepository.get(chatId)

        const updatedMeta = chat.eventId > afterEventId ? chat : undefined
        const updatedMembers = this.userRepository.getByChatId(chatId, afterEventId)
        const updatedMessages = this.msgRepository.getAll(chatId, afterEventId)

        return {
            meta: updatedMeta,
            members: updatedMembers,
            messages: updatedMessages,
            latestEventId: getLatestEventId(updatedMeta, updatedMembers, updatedMessages, afterEventId)
        }
    }
}

function getLatestEventId(meta: Chat | undefined, members: User[], messages: Message[], currentEventId: number) {
    let latestEventId = currentEventId

    if (meta) {
        latestEventId = Math.max(latestEventId, meta.eventId)
    }

    if (members.length > 0) {
        const maxMembersEventId = members.reduce((maxEventId, current) => Math.max(maxEventId, current.eventId), -1)
        latestEventId = Math.max(latestEventId, maxMembersEventId)
    }

    if (messages.length > 0) {
        const maxMessagesEventId = messages.reduce((maxEventId, current) => Math.max(maxEventId, current.eventId), -1)
        latestEventId = Math.max(latestEventId, maxMessagesEventId)
    }

    return latestEventId
}