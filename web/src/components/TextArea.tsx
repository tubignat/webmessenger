import React, {forwardRef, useEffect, useImperativeHandle, useRef, useState} from "react";
import styled from "styled-components";
import {Colors} from "../common/Colors";

interface InputContainerProps {
    invalid: boolean
    width?: string
    height?: string
    minHeight?: string
}

interface StyledTextAreaProps {
    fontSize: string
    height?: string
}

interface InputProps {
    value: string
    onChange: (value: string) => void
    autoFocus?: boolean
    onFocus?: () => void
    onBlur?: () => void
    fontSize?: string
    width?: string
    height?: string
    minHeight?: string
    invalid?: boolean
    placeholder?: string
    charLimit?: number
    shouldMatchRegex?: RegExp
    customIsAllowed?: (value: string) => boolean
}

const StyledTextArea = styled.textarea<StyledTextAreaProps>`
    font-family: Segoe UI,Helvetica Neue,Roboto,Arial,Liberation Sans,Nimbus Sans L,sans-serif;
    resize: none;
    border: 0px;
    background-color: transparent;
    padding: 0px;
    margin: 0px;
    font-size: ${props => props.fontSize};
    height: ${props => props.height};
    line-height: 1.2;
    transition: .2s height;
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
    align-items: flex-start;
    overflow: hidden;
    transition: .1s border, .2s height;
    
    &:focus-within {
        outline: 0;
        border: 1px ${props => props.invalid ? Colors.danger : Colors.primary} solid;
    }
`

function TextAreaInner(props: InputProps, ref: any) {
    const inputRef = useRef<HTMLTextAreaElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const [height, setHeight] = useState('')

    useImperativeHandle(ref, () => ({
        focus: () => inputRef?.current?.focus()
    }));

    useEffect(resize, [props.value])

    return <InputContainer
        ref={containerRef}
        invalid={props.invalid ?? false}
        onClick={() => inputRef?.current?.focus?.()}
        width={props.width}
        height={height ? height : props.height}
        minHeight={props.minHeight}
        onScroll={_ => containerRef?.current && (containerRef.current.scrollTop = 0)}>
        <StyledTextArea
            ref={inputRef}
            rows={1}
            placeholder={props.placeholder}
            value={props.value}
            onChange={onChange}
            onFocus={props.onFocus}
            onBlur={props.onBlur}
            fontSize={props.fontSize ?? '16px'}
            autoFocus={props.autoFocus}
        />
    </InputContainer>

    function onChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
        const area = e.target
        const value = props.charLimit && area.value.length > props.charLimit
            ? area.value.slice(0, props.charLimit)
            : area.value

        if (isValid(value, props.shouldMatchRegex, props.customIsAllowed)) {
            props.onChange(value)
        }
    }

    function resize() {
        const area = inputRef.current
        if (!area) {
            throw Error("textarea ref was null at resize")
        }

        if (isValid(props.value, props.shouldMatchRegex, props.customIsAllowed)) {
            area.style.height = 'auto'
            area.style.height = area.scrollHeight + 'px'
            setHeight((area.scrollHeight + 20) + 'px')
        }
    }
}

export const TextArea = forwardRef(TextAreaInner)

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
