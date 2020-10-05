import React from "react";
import styled from "styled-components";
import {Row} from "../../components/Row";
import {Gap} from "../../components/Gap";
import {MessageInput} from "./MessageInput";
import {MessageContainer} from "./MessageContainer";
import {Message} from "../../common/storage/ChatStorage";

const Content = styled.div`
    width: 100%;
    max-width: 1300px;
    margin: 0 auto;
    align-self: flex-end;
    padding: 20px;
`

const MsgInputContainer = styled.div`
    position: fixed;
    bottom: 0;
    width: calc(100% - 240px - 40px);
    max-width: 1300px;
    background: white;
`

interface ChatContentProps {
    messages: Message[]
    sendMessage: (msg: string) => void
}

export function ChatContent(props: ChatContentProps) {
    return <Row width='100%' minHeight='100vh'>
        <Gap size={240}/>
        <Content>
            <div style={{marginBottom: 48, userSelect: 'text'}}>
                {
                    props.messages.map(m => <MessageContainer key={m.id + m.optimisticUpdateStatus} message={m}/>)
                }
            </div>
            <MsgInputContainer>
                <MessageInput sendMessage={props.sendMessage}/>
            </MsgInputContainer>
        </Content>
    </Row>
}