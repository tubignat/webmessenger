import React from "react";
import styled from "styled-components";
import {Row} from "../../components/Row";
import {Gap} from "../../components/Gap";
import {MessageInput} from "./MessageInput";
import {MessageGroupContainer} from "./MessageGroupContainer";
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
    border-radius: 4px;
`

interface ChatContentProps {
    messages: Message[]
    sendMessage: (msg: string) => void
}

export function ChatContent(props: ChatContentProps) {

    const groups = props.messages.reduce((groups, msg) => {
        if (groups.length === 0) {
            return [[msg]]
        }

        const lastGroup = groups[groups.length - 1]
        const lastMsgInGroup = lastGroup[lastGroup.length - 1]

        if (msg.user.id === lastMsgInGroup.user.id && Math.abs(msg.timestamp.getTime() - lastMsgInGroup.timestamp.getTime()) < 30 * 1000) {
            lastGroup.push(msg)
            return groups
        }

        groups.push([msg])
        return groups

    }, [] as Message[][])

    return <Row width='100%' minHeight='100vh'>
        <Gap size={240}/>
        <Content>
            <div style={{marginBottom: 48, userSelect: 'text'}}>
                {
                    groups.map(group => <MessageGroupContainer
                        key={group[0].id + group[0].optimisticUpdateStatus}
                        messageGroup={group}
                    />)
                }
            </div>
            <MsgInputContainer>
                <MessageInput sendMessage={props.sendMessage}/>
            </MsgInputContainer>
        </Content>
    </Row>
}