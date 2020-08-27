import styled from "styled-components";

export const Gapped = styled.div`
    display: flex;
    flex-direction: column;
    & :last-child {
        margin-bottom: 0;
    }
    & > * {
        margin-bottom: 16px;
    }
`