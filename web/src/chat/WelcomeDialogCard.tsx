import {Input} from "../components/Input";
import {Gap} from "../components/Gap";
import {Centered} from "../components/Centered";
import {Button} from "../components/Button";
import React, {useEffect} from "react";
import styled from "styled-components";
import {Colors} from "../common/Colors";
import {ChatHeader} from "../components/ChatHeader";
import {GlobalShortcutManager, Keys} from "../common/ShortcutManager";

const Container = styled.div`
    background-color: ${Colors.secondaryBackground};
    border: 1px solid #E5E5EA;
    box-sizing: border-box;
    border-radius: 8px;
    padding: 24px 20px;
`

interface WelcomeDialogCardProps {
    chatKey: string
    name: string
    defaultName: string
    onNameChange: (value: string) => void
    chatName: string
    onJoinClick: () => void
}

export function WelcomeDialogCard(props: WelcomeDialogCardProps) {
    useEffect(() => {
        const shortcut = GlobalShortcutManager.register([Keys.enter], props.onJoinClick)
        return () => GlobalShortcutManager.unregister(shortcut)
    }, [props.onJoinClick])

    return <Container>
        <Centered>
            <ChatHeader chatName={props.chatName} chatKey={props.chatKey} />
            <Gap size={56}/>
            <Input
                label='Name'
                value={props.name}
                onChange={props.onNameChange}
                width='320px'
                placeholder={props.defaultName}
                charLimit={75}
                autoFocus
            />

            <Gap size={48}/>

            <Button size='small' onClick={props.onJoinClick}>Join</Button>
        </Centered>
    </Container>
}
