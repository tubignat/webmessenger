import React, {useEffect, useMemo, useState} from 'react';
import {WelcomeDialog} from "./WelcomeDialog";
import {ChatRoom} from "./room/ChatRoom";
import {GlobalChatStorage} from "../common/storage/ChatStorageImpl";
import {ChatDescriptor, User} from "../common/storage/ChatStorage";

export function Chat() {
    const chatKey = useMemo(getChatKey, [])
    const [chatDescriptor, setChatDescriptor] = useState<ChatDescriptor | null>(null)
    const [myUser, setMyUser] = useState<User | undefined>(undefined)

    useEffect(() => {
        GlobalChatStorage.getOrLoadChatDescriptor(chatKey).then(desc => {
            setChatDescriptor(desc)
            setMyUser(desc.myUser)
        })
    }, [chatKey])

    if (!chatDescriptor) {
        return <div/>
    }

    if (myUser) {
        return <ChatRoom chatKey={chatKey}/>
    }

    return <WelcomeDialog chatDescriptor={chatDescriptor} onJoinChat={onJoinChat}/>

    function getChatKey() {
        const result = new RegExp('^/([a-zA-Zа-яА-Я0-9-_.]+)/?').exec(window.location.pathname)
        if (result && result.length > 1) {
            return result[1]
        }

        return ''
    }

    function onJoinChat(chosenName: string) {
        GlobalChatStorage
            .joinChat(chatKey, chosenName)
            .then(() => {
                setMyUser(GlobalChatStorage.getMyUser(chatKey))
            })
    }
}
