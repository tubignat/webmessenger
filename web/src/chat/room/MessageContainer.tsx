import React from "react";
import {Message} from "../../common/storage/ChatStorage";
import styled from "styled-components";
import {Gap} from "../../components/Gap";

const Container = styled.div`
    display: flex;
    padding: 10px 0;
`

const Picture = styled.div`
    width: 40px;
    height: 40px;
    background-color: #E9AFAF;
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

export function MessageContainer({message}: { message: Message }) {
    return <Container>
        <Picture/>
        <Gap size={16}/>
        <div>
            <Name>{message.user.name}</Name>
            <Gap size={8} />
            <Text>
                {message.text + ", status: " + message.optimisticUpdateStatus}
            </Text>
        </div>
    </Container>
}