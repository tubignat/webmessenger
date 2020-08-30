import styled from "styled-components";
import {Colors} from "../common/Colors";

interface StyledButtonProps {
    readonly size: 'big' | 'small'
    height?: string
}

export const Button = styled.button<StyledButtonProps>`
    background-color: ${Colors.primary};
    font-size: ${props => props.size === 'big' ? '16px' : '14px'};
    font-weight: bold;    
    color: ${Colors.buttonText};
    padding: ${props => props.size === 'big' ? '12px 16px' : '8px 16px'};
    border-radius: ${props => props.size === 'big' ? '8px' : '4px'};
    cursor: pointer;
    border: 2px transparent solid;
    transition: .2s background-color, .2s border;
    height: ${props => props.height};
    
    &:focus {
        outline: 0;
        border: 2px ${Colors.primary} solid;
        background-color: ${Colors.primaryHover};
    }
    
    &:hover {
        background-color: ${Colors.primaryHover};
    }
    
    &:active {
        background-color: ${Colors.primaryClicked};
    }
    
    &:disabled {
        background-color: ${Colors.secondaryText};
    }
`