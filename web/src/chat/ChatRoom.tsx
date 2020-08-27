import React, {useState} from "react";
import {ChatData} from "../common/ChatStorage";
import styled from "styled-components";
import {Colors} from "../common/Colors";
import {ChatHeader} from "../components/ChatHeader";
import {Gap} from "../components/Gap";
import {Input} from "../components/Input";
import {SidebarMenuBlock} from "./SidebarMenuBlock";
import {Member} from "./Member";
import {Gapped} from "../components/Gapped";
import {A} from "../components/A";

interface ChatRoomProps {
    chatData: ChatData
}

const Container = styled.div`
`

const Sidebar = styled.div`
    width: 240px;
    background-color: ${Colors.secondaryBackground};
    border-right: 1px ${Colors.border} solid;
    height: 100vh;
    padding: 24px 16px;
    box-sizing: border-box;
`

export function ChatRoom({chatData}: ChatRoomProps) {
    const [searchQuery, setSearchQuery] = useState('')

    if (!chatData.meta) {
        return <div/>
    }

    return <Container>
        <Sidebar>
            <ChatHeader chatName={chatData.meta.name} chatKey={chatData.meta.key}/>
            <Gap size={40}/>
            <Input label='' value={searchQuery} onChange={setSearchQuery} placeholder='Search' fontSize='12px'/>
            <Gap size={40}/>
            <SidebarMenuBlock header='Members'>
                <Gapped>
                    {
                        chatData.members?.map(m => <Member key={m.id} name={m.name} isMe={m.id === chatData.myUser?.id}/>)
                    }
                </Gapped>
            </SidebarMenuBlock>
            <SidebarMenuBlock header='Settings'>
                <A href={'http://' + window.location.host}>Create new chat</A>
            </SidebarMenuBlock>
        </Sidebar>

    </Container>
}