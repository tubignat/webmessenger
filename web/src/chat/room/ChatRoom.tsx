import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {Sidebar} from "./Sidebar";
import {ChatContent} from "./ChatContent";
import {GlobalChatStorage} from "../../common/storage/ChatStorageImpl";

const Container = styled.div`
`

export function ChatRoom({chatKey}: { chatKey: string }) {
    const [descriptor, setDescriptor] = useState(GlobalChatStorage.getChatDescriptor(chatKey))
    const [members, setMembers] = useState(GlobalChatStorage.getMembers(chatKey))
    const [myUser, setMyUser] = useState(GlobalChatStorage.getMyUser(chatKey))
    const [messages, setMessages] = useState(GlobalChatStorage.getMessages(chatKey))

    useEffect(() => {
        GlobalChatStorage.subscribe(chatKey, () => {
            setDescriptor(GlobalChatStorage.getChatDescriptor(chatKey))
            setMembers(GlobalChatStorage.getMembers(chatKey))
            setMyUser(GlobalChatStorage.getMyUser(chatKey))
            setMessages(GlobalChatStorage.getMessages(chatKey))
        })
    }, [])

    useEffect(() => {
        window.scrollTo(0, document.body.scrollHeight);
    }, [messages])

    return <Container>
        <Sidebar
            chatName={descriptor.name}
            chatKey={descriptor.key}
            members={members ?? []}
            myUserId={myUser.id}
        />

        <ChatContent messages={messages} sendMessage={msg => GlobalChatStorage.sendMessage(chatKey, msg)}/>
    </Container>
}

