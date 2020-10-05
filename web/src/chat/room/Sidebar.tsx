import React, {useEffect, useRef, useState} from "react";
import styled from "styled-components";
import {Colors} from "../../common/Colors";
import {ChatHeader} from "../../components/ChatHeader";
import {Gap} from "../../components/Gap";
import {Input} from "../../components/Input";
import {SidebarMenuBlock} from "./SidebarMenuBlock";
import {Gapped} from "../../components/Gapped";
import {Member} from "./Member";
import {A} from "../../components/A";
import {UserContract} from "../../common/Api";
import {GlobalShortcutManager, Keys} from "../../common/ShortcutManager";

const SidebarContainer = styled.div`
    width: 15%;
    min-width: 240px;
    background-color: ${Colors.secondaryBackground};
    border-right: 1px ${Colors.border} solid;
    height: 100vh;
    padding: 24px 16px;
    box-sizing: border-box;
    position: fixed;
`

export function Sidebar(props: { chatName: string, chatKey: string, members: UserContract[], myUserId: number }) {

    const [searchQuery, setSearchQuery] = useState('')
    const searchRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        const shortcut = GlobalShortcutManager.register([Keys.control, Keys.f], () => searchRef?.current?.focus())
        return () => GlobalShortcutManager.unregister(shortcut)
    }, [searchRef])

    return <SidebarContainer>
        <ChatHeader chatName={props.chatName} chatKey={props.chatKey}/>
        <Gap size={40}/>
        <Input label='' value={searchQuery} onChange={setSearchQuery} placeholder='Search' fontSize='12px' ref={searchRef}/>
        <Gap size={40}/>
        <SidebarMenuBlock header='Members'>
            <Gapped>
                {
                    props.members.map(m => <Member key={m.id} name={m.name} isMe={m.id === props.myUserId}/>)
                }
            </Gapped>
        </SidebarMenuBlock>
        <SidebarMenuBlock header='Settings'>
            <A href={'http://' + window.location.host}>Create new chat</A>
        </SidebarMenuBlock>
    </SidebarContainer>
}