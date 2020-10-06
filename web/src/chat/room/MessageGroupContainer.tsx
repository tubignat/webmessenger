import React from "react";
import {Message} from "../../common/storage/ChatStorage";
import styled from "styled-components";
import {Gap} from "../../components/Gap";
import {Colors} from "../../common/Colors";
import {timestampToString} from "../../common/Time";

const Container = styled.div`
    display: flex;
    padding: 10px 0;
`

interface PictureProps {
    avatar: string
}

const Picture = styled.div<PictureProps>`
    width: 40px;
    height: 40px;
    background-color: ${props => props.avatar};
    border-radius: 40px;
    flex-shrink: 0;
`

const Name = styled.div`
    line-height: 14px;
    font-size: 14px;
    font-weight: bold;
`

const Text = styled.div`
    line-height: 16px;
    font-size: 14px;
    font-weight: normal;
    user-select: text;
`

const Timestamp = styled.div`
    line-height: 16px;
    font-size: 14px;
    font-weight: normal;
    color: ${Colors.secondaryText};
    margin-left: 52px;
`

export function MessageGroupContainer({messageGroup}: { messageGroup: Message[] }) {
    return <Container>
        <Picture avatar={messageGroup[0].user.avatar}/>
        <Gap size={16}/>
        <div style={{flexGrow: 1}}>
            {
                messageGroup.map((msg, i) => <MessageContainer message={msg} first={i === 0}/>)
            }
        </div>
    </Container>
}

function MessageContainer(props: { message: Message, first: boolean }) {
    const {message, first} = props
    return <div style={{display: 'flex', flexGrow: 1, alignItems: 'flex-end', paddingBottom: 8}}>
        <div style={{flexGrow: 1}}>
            {
                first && <Name>{message.user.name}</Name>
            }
            <Gap size={8}/>
            <Text>
                {message.text}
            </Text>
        </div>
        <Timestamp>{timestampToString(message.timestamp)}</Timestamp>
    </div>
}