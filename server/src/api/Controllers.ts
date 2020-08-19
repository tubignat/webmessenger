import {controller} from "./Controller";
import {exceptionMiddleware, responseHeaderMiddleware} from "./Middleware";
import {InMemoryChatRepository, InMemoryMessageRepository, InMemoryUserRepository} from "../impl/Repositories";
import {ChatService} from "../domain/Services";

const usr = new InMemoryUserRepository()
const msg = new InMemoryMessageRepository()
const chats = new InMemoryChatRepository()

const service = new ChatService(usr, msg, chats)

export const loadChat = controller([responseHeaderMiddleware, exceptionMiddleware], (context) => {
    const key = context.request.query["key"] as string

    const result = service.loadChat(key.toLowerCase())
    return {
        statusCode: 200,
        data: result
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
    const {key} = JSON.parse(context.request.body)

    service.createChat(key.toLowerCase())

    return {
        statusCode: 200,
        data: null
    }
})