import React, {useMemo, useState} from 'react';
import {generateKey, generateName} from "../domain/DefaultPreferences";
import {Redirect} from 'react-router-dom';
import {Button} from "../components/Button";
import styled from "styled-components";
import {Gap} from "../components/Gap";
import {Colors} from "../common/Colors";
import {OptionalPreferences} from "./OptionalPreferences";
import {Api} from "../common/Api";

const Container = styled.div`
    padding: 80px;
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
`
const Header = styled.div`
    color: ${Colors.primaryText};
    font-size: 40px;
    font-weight: bold;
    line-height: 1em;
`

const Description = styled.div`
    color: ${Colors.secondaryText};
    font-size: 20px;
    text-align: center;
    line-height: 1em;
`

export function Landing() {
    const defaultPreferences = useMemo(() => {
        return {key: generateKey(), name: generateName(), password: ''}
    }, [])
    const [redirectTo, setRedirectTo] = useState('')
    const [userPreferences, setUserPreferences] = useState({key: '', name: '', password: ''})
    const [arePreferencesValid, setArePreferencesValid] = useState(true)

    if (redirectTo) {
        return <Redirect to={redirectTo} push/>
    }

    return <Container>
        <Header>WebChat</Header>

        <Gap size={64}/>

        <Description>A simple web messenger that allows you create chat rooms and invite your friends.</Description>
        <Gap size={12}/>
        <Description>Just press the button and share the link! </Description>

        <Gap size={64}/>

        <Button size='big' disabled={!arePreferencesValid} onClick={onCreateChat}>Create chat</Button>

        <Gap size={64}/>

        <OptionalPreferences
            defaultPreferences={defaultPreferences}
            userPreferences={userPreferences}
            onChange={setUserPreferences}
            onValidityChange={setArePreferencesValid}
        />
    </Container>

    function onCreateChat() {
        const chatKey = userPreferences.key ? userPreferences.key : defaultPreferences.key
        const chatName = userPreferences.name ? userPreferences.name : defaultPreferences.name
        Api.createChat(chatKey, chatName)
            .then(resp => {
                if (resp.ok)
                    setRedirectTo('/' + chatKey)
                else
                    alert('Error occurred')
            })
            .catch((e) => alert(e))
    }
}