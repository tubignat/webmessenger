import styled from "styled-components";

interface CenteredProps {
    width?: string
    height?: string
}

export const Centered = styled.div<CenteredProps>`
    width: ${props => props.width ? props.width : '100%'};
    height: ${props => props.height ? props.height : 'fit-content'};
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`