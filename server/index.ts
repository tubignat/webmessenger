import express = require("express");
import {createChat, loadChat, loadNewMessages, sendMessage} from "./src/api/Controllers";
const app: express.Application = express()

app.use(express.text())

app.get('/api/loadChat', loadChat)
app.get('/api/loadNewMessages', loadNewMessages)
app.post('/api/sendMessage', sendMessage)
app.post('/api/createChat', createChat)

app.listen(4000, () => console.log("Start listening"))

