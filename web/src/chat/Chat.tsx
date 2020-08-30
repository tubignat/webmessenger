import React, {useEffect, useMemo, useState} from 'react';
import {WelcomeDialog} from "./WelcomeDialog";
import {ChatData, GlobalChatStorage} from "../common/ChatStorage";
import {ChatRoom} from "./room/ChatRoom";

export function Chat() {
    const chatKey = useMemo(getChatKey, [])
    const [chatData, setChatData] = useState<ChatData | null>(GlobalChatStorage.get(chatKey))

    useEffect(() => {
        GlobalChatStorage.subscribe({chatKey: chatKey, callback: setChatData})
    }, [])

    if (chatData?.meta && chatData.myUser) {
        return <ChatRoom chatData={chatData} />
    }

    return <WelcomeDialog chatKey={chatKey} chatData={chatData}/>

    function getChatKey() {
        const result = new RegExp('^/([a-zA-Zа-яА-Я0-9-_.]+)/?').exec(window.location.pathname)
        if (result && result.length > 1) {
            return result[1]
        }

        return ''
    }
}
