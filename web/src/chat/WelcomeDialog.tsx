import React, {useEffect, useMemo, useState} from "react";
import {Gap} from "../components/Gap";
import styled from "styled-components";
import {Colors} from "../common/Colors";
import {WelcomeDialogCard} from "./WelcomeDialogCard";
import {ChatDescriptor} from "../common/storage/ChatStorage";

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
    chatDescriptor: ChatDescriptor
    onJoinChat: (chosenName: string) => void
}

export function WelcomeDialog(props: WelcomeDialogProps) {
    const defaultName = useMemo(() => 'Anonymous Cat', [])
    const [name, setName] = useState('')

    return <Container>
        <Header>WebChat</Header>

        <Gap size={64}/>

        <Description>Type your name and choose an avatar to join the chat</Description>

        <Gap size={64}/>

        <WelcomeDialogCard
            name={name}
            defaultName={defaultName}
            onNameChange={value => setName(value)}
            chatName={props.chatDescriptor.name}
            chatKey={props.chatDescriptor.key}
            onJoinClick={() => props.onJoinChat(name ? name : defaultName)}
        />
    </Container>
}

