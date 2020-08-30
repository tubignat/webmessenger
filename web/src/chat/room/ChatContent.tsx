import React from "react";
import styled from "styled-components";
import {Row} from "../../components/Row";
import {Gap} from "../../components/Gap";
import {MessageInput} from "./MessageInput";
import {Message} from "../../common/Api";

const Content = styled.div`
    width: 100%;
    max-width: 1300px;
    margin: 0 auto;
    background-color: aliceblue;
    align-self: flex-end;
    padding: 20px;
`

interface ChatContentProps {
    messages: Message[]
    sendMessage: (msg: string) => void
}

export function ChatContent(props: ChatContentProps) {
    return <Row width='100%' minHeight='100vh'>
        <Gap size={240}/>
        <Content>
            <div>
                {
                    props.messages.map(m => <div key={m.id}>{m.text}</div>)
                }
            </div>
            <MessageInput sendMessage={props.sendMessage} />
        </Content>
    </Row>
}