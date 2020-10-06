import {Gap} from "./Gap";
import {Centered} from "./Centered";
import React from "react";
import styled from "styled-components";
import {Colors} from "../common/Colors";
import {host} from "../common/DefaultPreferences";

const GroupPicture = styled.div`
    width: 64px;
    height: 64px;
    background: #DFD600;
    border-radius: 32px;
`

const GroupName = styled.div`
    font-weight: bold;
    font-size: 16px;
    user-select: text;
`

const GroupLink = styled.div`
    font-size: 12px;
    color: ${Colors.secondaryText};
    user-select: text;
`

export function ChatHeader(props: {chatName: string, chatKey: string}) {
    return <Centered>
        <GroupPicture/>

        <Gap size={24}/>

        <GroupName>{props.chatName}</GroupName>

        <Gap size={4}/>

        <GroupLink>{host}/{props.chatKey}</GroupLink>
    </Centered>
}
