import React from "react";
import styled from "styled-components";
import {Gap} from "../components/Gap";
import {Colors} from "../common/Colors";

const Header = styled.div`
    font-size: 16px;
    font-weight: bold;
`

const HeaderDelimiter = styled.div`
    height: 1px;
    background-color: ${Colors.border};
    width: 100%;
`

export function SidebarMenuBlock(props: { header: string, children?: JSX.Element | JSX.Element[] | string | undefined }) {
    return <div>
        <Header>{props.header}</Header>

        <Gap size={8}/>

        <HeaderDelimiter/>

        <Gap size={16}/>

        {
            props.children
        }

        <Gap size={40}/>
    </div>
}