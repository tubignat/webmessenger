import React, {forwardRef, useImperativeHandle, useRef, useState} from "react";
import styled from "styled-components";
import {Gap} from "./Gap";
import {Colors} from "../common/Colors";


interface InputContainerProps {
    invalid: boolean
    width?: string
    height?: string
    minHeight?: string
}

interface LabelProps {
    invalid: boolean
}

interface StyledInputProps {
    fontSize: string
    height?: string
}

interface InputProps {
    value: string
    onChange: (value: string) => void
    autoFocus?: boolean
    label?: string
    fontSize?: string
    width?: string
    height?: string
    minHeight?: string
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
    height: ${props => props.height};
    line-height: 1.2;
    flex-grow: 1;
    
    &:focus {
        outline: 0;
    }
    
    &::placeholder {
        color: ${Colors.secondaryText};
    }
`

const InputContainer = styled.div<InputContainerProps>`
    border-radius: 4px;
    border: 1px ${props => props.invalid ? Colors.danger : Colors.primaryText} solid;
    padding: 8px 12px;
    width: ${props => props.width};
    height: ${props => props.height};
    min-height: ${props => props.minHeight};
    box-sizing: border-box;
    display: flex;
    background-color: ${Colors.background};
    cursor: text; 
    align-items: center;
    transition: .1s border, .5s height;
    
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

function InputInner(props: InputProps, ref: any) {
    const inputRef = useRef<HTMLInputElement>(null)
    useImperativeHandle(ref, () => ({
        focus: () => inputRef?.current?.focus()
    }));
    return <div style={{width: props.width}}>
        {
            props.label && <Label invalid={props.invalid ?? false}>{props.label}</Label>
        }
        {
            props.label && <Gap size={8}/>
        }
        <InputContainer invalid={props.invalid ?? false} onClick={() => inputRef?.current?.focus?.()}
                        width={props.width} height={props.height} minHeight={props.minHeight}>
            <Prefix>{props.prefix}</Prefix>
            <StyledInput
                ref={inputRef}
                placeholder={props.placeholder}
                value={props.value}
                onChange={onChange}
                autoComplete='new-password'
                type={props.type ?? 'text'}
                fontSize={props.fontSize ?? '16px'}
                autoFocus={props.autoFocus}
            />
        </InputContainer>
    </div>

    function onChange(e: React.ChangeEvent<HTMLInputElement>) {
        const value = props.charLimit && e.target.value.length > props.charLimit
            ? e.target.value.slice(0, props.charLimit)
            : e.target.value

        if (isValid(value, props.shouldMatchRegex, props.customIsAllowed)) {
            props.onChange(value)
        }
    }
}

export const Input = forwardRef(InputInner)

function isValid(value: string, shouldMatchRegex: RegExp | undefined, customIsAllowed: ((v: string) => boolean) | undefined): boolean {
    if (!value) {
        return true
    }

    if (shouldMatchRegex && !shouldMatchRegex.test(value)) {
        return false
    }

    if (customIsAllowed && !customIsAllowed(value)) {
        return false
    }

    return true
}
