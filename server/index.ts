import express = require("express");
import {
    createChat,
    isKeyAvailable,
    joinChat,
    loadChatMeta, loadUpdates,
    sendMessage
} from "./src/api/Controllers";

const app: express.Application = express()

app.use(express.text())

app.get('/api/loadChatMeta', loadChatMeta)
app.post('/api/joinChat', joinChat)
app.post('/api/sendMessage', sendMessage)
app.post('/api/createChat', createChat)
app.get('/api/isKeyAvailable', isKeyAvailable)
app.get('/api/loadUpdates', loadUpdates)

app.listen(4000, () => console.log("Start listening"))