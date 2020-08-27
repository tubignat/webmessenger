import {controller} from "./Controller";
import {exceptionMiddleware, responseHeaderMiddleware} from "./Middleware";
import {InMemoryChatRepository, InMemoryMessageRepository, InMemoryUserRepository} from "../impl/Repositories";
import {ChatService} from "../domain/Services";
import crypto from 'crypto'

const usr = new InMemoryUserRepository()
const msg = new InMemoryMessageRepository()
const chats = new InMemoryChatRepository()

const service = new ChatService(usr, msg, chats)
const salt = "$adg121nbig0&^*^12bcx,l;1235i80"

export const loadChat = controller([responseHeaderMiddleware, exceptionMiddleware], (context) => {
    const key = context.request.query["key"] as string

    if (chats.isKeyAvailable(key.toLowerCase())) {
        return {
            statusCode: 404,
            data: null
        }
    }

    const result = service.loadChat(key.toLowerCase())
    return {
        statusCode: 200,
        data: result
    }
})

export const loadChatMeta = controller([responseHeaderMiddleware, exceptionMiddleware], (context) => {
    const key = context.request.query["key"] as string

    if (chats.isKeyAvailable(key.toLowerCase())) {
        return {
            statusCode: 404,
            data: null
        }
    }

    const result = service.loadChatMeta(key.toLowerCase())
    return {
        statusCode: 200,
        data: result
    }
})

export const joinChat = controller([responseHeaderMiddleware, exceptionMiddleware], context => {
    const {name, chatId} = JSON.parse(context.request.body)

    const user = service.joinChat(chatId, name)
    const members = service.getMembers(chatId)

    return {
        statusCode: 200,
        data: {
            user: user,
            token: generateToken(chatId, user.id, salt),
            members: members
        }
    }
})

export const loadNewMessages = controller([responseHeaderMiddleware, exceptionMiddleware], context => {
    const key = context.request.query["key"] as string
    const lastMessageId = Number.parseInt(context.request.query["lastMessageId"] as string)

    const result = service.loadNewMessages(key.toLowerCase(), lastMessageId)
    return {
        statusCode: 200,
        data: result
    }
})

export const sendMessage = controller([responseHeaderMiddleware, exceptionMiddleware], context => {
    const {key, text, userId} = JSON.parse(context.request.body)

    service.sendMessage(key.toLowerCase(), text, userId)

    return {
        statusCode: 200,
        data: null
    }
})

export const createChat = controller([responseHeaderMiddleware, exceptionMiddleware], context => {
    const {key, name} = JSON.parse(context.request.body)

    service.createChat(key.toLowerCase(), name)

    return {
        statusCode: 200,
        data: null
    }
})

export const isKeyAvailable = controller([responseHeaderMiddleware, exceptionMiddleware], context => {
    const key = context.request.query["key"] as string
    return {
        statusCode: 200,
        data: service.isKeyAvailable(key)
    }
})


function generateToken(chatId: number, userId: number, salt: string) {
    const str = `${chatId}_${userId}_${salt}`
    return crypto.createHash('sha256').update(str).digest('base64');
}