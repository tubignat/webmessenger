import React from "react";
import styled from "styled-components";
import {Gap} from "../components/Gap";
import {Colors} from "../common/Colors";
import {Row} from "../components/Row";
import {Column} from "../components/Column";
import {Spring} from "../components/Spring";

interface MemberProps {
    name: string
    isMe: boolean
}

const MemberPicture = styled.div`
    width: 36px;
    height: 36px;
    border-radius: 36px;
    background-color: #E9AFAF;
    flex-shrink: 0;
`

const MemberName = styled.div`
    font-size: 14px;
    font-weight: bold;
    line-height: normal;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    max-width: 140px;
`

const LastActivity = styled.div`
    font-size: 14px;
    color: ${Colors.primary};
    line-height: normal;
`

const Me = styled.div`
    font-size: 14px;
    color: ${Colors.secondaryText};
    line-height: normal;
    flex-shrink: 0;
`

export function Member(props: MemberProps) {
    return <Row>
        <MemberPicture/>
        <Gap size={12}/>
        <Column height='36px'>
            <Row>
                <MemberName>{props.name}</MemberName>
                <Spring/>
                {
                    props.isMe && <Me>me</Me>
                }
            </Row>
            <Spring/>
            <LastActivity>online</LastActivity>
        </Column>
    </Row>
}