import styled from "styled-components";

interface RowProps {
    width?: string
    minHeight?: string
    alignItems?: string
}

export const Row = styled.div<RowProps>`
    display: flex;
    flex-direction: row;
    align-items: ${props => props.alignItems ? props.alignItems : 'center'};
    flex-grow: 1;
    ${props => props.width ? `width: ${props.width};` : ''}
    ${props => props.minHeight ? `min-height: ${props.minHeight};` : ''}
`
