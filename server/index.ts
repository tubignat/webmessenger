import express = require("express");
import {
    createChat,
    isKeyAvailable,
    joinChat,
    loadChat,
    loadChatMeta,
    loadNewMessages,
    sendMessage
} from "./src/api/Controllers";

const app: express.Application = express()

app.use(express.text())

app.get('/api/loadChat', loadChat)
app.get('/api/loadChatMeta', loadChatMeta)
app.post('/api/joinChat', joinChat)
app.get('/api/loadNewMessages', loadNewMessages)
app.post('/api/sendMessage', sendMessage)
app.post('/api/createChat', createChat)
app.get('/api/isKeyAvailable', isKeyAvailable)

app.listen(4000, () => console.log("Start listening"))