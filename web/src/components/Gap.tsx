import styled from "styled-components";

interface GapProps {
    size: number
}

export const Gap = styled.div<GapProps>`
    width: ${props => props.size}px;
    height: ${props => props.size}px;
    flex-shrink: 0;
    flex-grow: 0;
`