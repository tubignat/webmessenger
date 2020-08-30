import React, {useEffect} from "react";
import {ChatData, GlobalChatStorage} from "../../common/ChatStorage";
import styled from "styled-components";
import {Sidebar} from "./Sidebar";
import {ChatContent} from "./ChatContent";
import {Api} from "../../common/Api";

interface ChatRoomProps {
    chatData: ChatData
}

const Container = styled.div`
`

export function ChatRoom({chatData}: ChatRoomProps) {
    useEffect(() => startLoadingUpdates(chatData.meta?.key), [])

    if (!chatData.meta || !chatData.myUser) {
        return <div/>
    }

    return <Container>
        <Sidebar
            chatName={chatData.meta.name}
            chatKey={chatData.meta.key}
            members={chatData.members ?? []}
            myUserId={chatData.myUser.id}
        />

        <ChatContent messages={chatData.messages ?? []} sendMessage={msg => sendMessage(chatData, msg)}/>
    </Container>
}

function sendMessage(chatData: ChatData, message: string) {
    if (!chatData.meta || !chatData.myUser) {
        throw Error('Meta is not loaded yet')
    }

    Api.sendMessage(chatData.meta.key, chatData.myUser.id, message)
}

function startLoadingUpdates(chatKey?: string) {
    if (!chatKey) {
        throw Error('chat key is empty')
    }

    const data = GlobalChatStorage.get(chatKey)
    if (!data?.meta) {
        throw Error('Chat meta is not loaded yet')
    }

    Api
        .loadUpdates(data.meta.id, data.eventId ?? -1)
        .then(r => {
            if (!data.meta) {
                throw Error('Empty meta')
            }

            GlobalChatStorage.update(data.meta.key, {
                eventId: r.latestEventId,
                meta: r.meta ?? data.meta,
                members: data.members?.concat(r.members) ?? r.members,
                messages: data.messages?.concat(r.messages) ?? r.messages
            })

            const key = data.meta.key
            setTimeout(() => startLoadingUpdates(key), 2000)
        })
}