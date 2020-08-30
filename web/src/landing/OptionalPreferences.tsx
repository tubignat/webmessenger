import React, {useMemo, useState} from "react";
import styled from "styled-components";
import {Colors} from "../common/Colors";
import {Gap} from "../components/Gap";
import {Input} from "../components/Input";
import {Api} from "../common/Api";
import {debounce} from "../common/Debounce";

const linkRegex = new RegExp('^[a-zA-Z0-9а-яА-Я][a-zA-Z0-9а-яА-Я-_.]*$')
const nameRegex = new RegExp('^[a-zA-Z0-9а-яА-Я-_.,()@ ]*$')

const Container = styled.div`
    border-radius: 8px;
    background: ${Colors.secondaryBackground};
    padding: 24px 20px;
`

const Header = styled.div`
    color: ${Colors.primaryText};
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    line-height: 1em;
`

const Description = styled.div`
    color: ${Colors.secondaryText};
    font-size: 12px;
    text-align: center;
    line-height: 1em;
`

interface OptionalPreferencesProps {
    userPreferences: Preferences
    defaultPreferences: Preferences
    onChange: (preferences: Preferences) => void
    onValidityChange: (isValid: boolean) => void
}

export interface Preferences {
    key: string
    name: string
    password: string
}

export function OptionalPreferences(props: OptionalPreferencesProps) {
    const [isLoading, setIsLoading] = useState(false)
    const [isKeyAvailable, setIsKeyAvailable] = useState(true)
    const isKeyAvailableDebounced = useMemo(checkIfKeyIsAvailableFactory, [])
    const inputsWidth = '320px'

    return <Container>
        <Header>Optional preferences</Header>
        <Gap size={8}/>
        <Description>You can choose your own values instead of generated</Description>

        <Gap size={32}/>

        <Input
            label={getLinkLabel()}
            value={props.userPreferences.key}
            onChange={onLinkChange}
            invalid={!isKeyAvailable}
            prefix='webchat.com/'
            placeholder={props.defaultPreferences.key}
            charLimit={255}
            shouldMatchRegex={linkRegex}
            customIsAllowed={isKeyAllowed}
            width={inputsWidth}
            autoFocus
        />

        <Gap size={24}/>

        <Input
            label='Chat name'
            value={props.userPreferences.name}
            onChange={value => props.onChange({...props.userPreferences, name: value})}
            placeholder={props.defaultPreferences.name}
            charLimit={80}
            shouldMatchRegex={nameRegex}
            width={inputsWidth}
        />

        <Gap size={24}/>

        <Input
            label='Password'
            value={props.userPreferences.password}
            onChange={value => props.onChange({...props.userPreferences, password: value})}
            charLimit={255}
            placeholder={props.defaultPreferences.password}
            type='password'
            width={inputsWidth}
        />
    </Container>

    function isKeyAllowed(key: string): boolean {
        for (let i = 0; i < key.length; i++) {
            if ((key[i] === '.' || key[i] === '_' || key[i] === '-') && i !== key.length - 1) {
                if (key[i + 1] === key[i])
                    return false
            }
        }

        return true
    }

    function getLinkLabel(): string {
        return isLoading
            ? 'Making sure link is available...'
            : isKeyAvailable ? 'Link' : 'Link is already taken'
    }

    async function onLinkChange(value: string) {
        props.onChange({...props.userPreferences, key: value})
        setIsKeyAvailable(true)
        isKeyAvailableDebounced(value)
    }

    function checkIfKeyIsAvailableFactory() {
        return debounce(300,
            (value: string) => {
                if (value) {
                    setIsLoading(true)
                    props.onValidityChange(false)
                    return Api.isKeyAvailable(value)
                }

                return Promise.resolve(true)
            },
            (isAvailable) => {
                setIsLoading(false)
                setIsKeyAvailable(isAvailable)
                props.onValidityChange(isAvailable)
            }
        )
    }
}
