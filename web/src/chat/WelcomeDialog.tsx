import React, {useEffect, useMemo, useState} from "react";
import {Gap} from "../components/Gap";
import styled from "styled-components";
import {Colors} from "../common/Colors";
import {WelcomeDialogCard} from "./WelcomeDialogCard";
import {Api, Chat} from "../common/Api";
import {ChatData, GlobalChatStorage} from "../common/ChatStorage";
import {throws} from "assert";

const Container = styled.div`
    padding: 80px;
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
`
const Header = styled.div`
    color: ${Colors.primaryText};
    font-size: 40px;
    font-weight: bold;
    line-height: 1em;
`

const Description = styled.div`
    color: ${Colors.secondaryText};
    font-size: 20px;
    text-align: center;
    line-height: 1em;
`

interface WelcomeDialogProps {
    chatKey: string
    chatData: ChatData | null
}

export function WelcomeDialog(props: WelcomeDialogProps) {
    const defaultName = useMemo(() => 'Anonymous Cat', [])
    const [name, setName] = useState('')

    useEffect(() => {
        if (!props.chatData?.meta) {
            Api.loadChatMeta(props.chatKey).then(chat =>
                GlobalChatStorage.update(props.chatKey, {
                    meta: {id: chat.id, key: chat.key, name: chat.name, created: chat.created}
                })
            )
        }
    }, [props.chatData, props.chatKey])

    return <Container>
        <Header>WebChat</Header>

        <Gap size={64}/>

        <Description>Type your name and choose an avatar to join the chat</Description>

        <Gap size={64}/>

        {
            !props.chatData?.meta && "Loading..."
        }
        {
            props.chatData?.meta && <WelcomeDialogCard
                name={name}
                defaultName={defaultName}
                onNameChange={value => setName(value)}
                chatName={props.chatData.meta.name}
                chatKey={props.chatData.meta.key}
                onJoinClick={
                    async () => {
                        const chosenName = name ? name : defaultName
                        if (props.chatData?.meta?.id === null || props.chatData?.meta?.id === undefined) {
                            throw Error("Chat Id was null when clicked 'Join'")
                        }
                        const response = await Api.joinChat(props.chatData.meta.id, chosenName)
                        GlobalChatStorage.update(props.chatKey, {
                            myUser: {...response.user, token: response.token},
                            members: response.members
                        })
                    }
                }
            />
        }
    </Container>
}

