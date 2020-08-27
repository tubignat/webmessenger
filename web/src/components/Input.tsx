import React, {ChangeEvent, useRef} from "react";
import styled from "styled-components";
import {Gap} from "./Gap";
import {Colors} from "../common/Colors";


interface ContainerProps {
    invalid: boolean
    width?: string
}

interface LabelProps {
    invalid: boolean
}

interface StyledInputProps {
    fontSize: string
}

interface InputProps {
    label: string
    value: string
    onChange: (value: string) => void
    fontSize?: string
    width?: string
    invalid?: boolean
    prefix?: string
    placeholder?: string
    type?: string
    charLimit?: number
    shouldMatchRegex?: RegExp
    customIsAllowed?: (value: string) => boolean
}

const StyledInput = styled.input<StyledInputProps>`
    border: 0px;
    background-color: transparent;
    padding: 0px;
    margin: 0px;
    font-size: ${props => props.fontSize};
    line-height: 1.2;
    flex-grow: 1;
    
    &:focus {
        outline: 0;
    }
    
    &::placeholder {
        color: ${Colors.secondaryText};
    }
`

const Container = styled.div<ContainerProps>`
    border-radius: 4px;
    border: 1px ${props => props.invalid ? Colors.danger : Colors.primaryText} solid;
    padding: 8px 12px;
    width: ${props => props.width};
    box-sizing: border-box;
    display: flex;
    background-color: ${Colors.background};
    cursor: text; 
    align-items: center;
    transition: .1s border;
    
    &:focus-within {
        outline: 0;
        border: 1px ${props => props.invalid ? Colors.danger : Colors.primary} solid;
    }
`

const Prefix = styled.div`
    color: ${Colors.secondaryText};
    font-size: 16px;
    line-height: 1.2;
`

const Label = styled.div<LabelProps>`
    color: ${props => props.invalid ? Colors.danger : Colors.primaryText};
    font-size: 16px;
    margin-left: 8px;
`

export function Input(props: InputProps) {
    const inputRef = useRef<HTMLInputElement>(null)
    return <div>
        <Label invalid={props.invalid ?? false}>{props.label}</Label>
        <Gap size={8}/>
        <Container invalid={props.invalid ?? false} onClick={() => inputRef?.current?.focus?.()} width={props.width}>
            <Prefix>{props.prefix}</Prefix>
            <StyledInput
                ref={inputRef}
                placeholder={props.placeholder}
                value={props.value}
                onChange={onChange}
                autoComplete='new-password'
                type={props.type ?? 'text'}
                fontSize={props.fontSize ?? '16px'}
            />
        </Container>
    </div>

    function onChange(e: ChangeEvent<HTMLInputElement>) {
        if (!e.target.value) {
            props.onChange(e.target.value)
            return
        }

        if (props.charLimit && e.target.value.length > props.charLimit) {
            e.target.value = e.target.value.slice(0, props.charLimit)
        }

        if (props.shouldMatchRegex && !props.shouldMatchRegex.test(e.target.value)) {
            return
        }

        if (props.customIsAllowed && !props.customIsAllowed(e.target.value)) {
            return
        }

        props.onChange(e.target.value)
    }
}