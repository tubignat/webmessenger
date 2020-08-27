import styled from "styled-components";

export interface ColumnProps {
    height?: string
}

export const Column = styled.div<ColumnProps>`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    ${props => props.height ?  `height: ${props.height};` : ''}
`

