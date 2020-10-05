import React, {useEffect, useMemo, useRef, useState} from "react";
import {Row} from "../../components/Row";
import {Gap} from "../../components/Gap";
import {Button} from "../../components/Button";
import {Column} from "../../components/Column";
import {TextArea} from "../../components/TextArea";
import {GlobalShortcutManager, Keys} from "../../common/ShortcutManager";

export function MessageInput({sendMessage}: {sendMessage: (msg: string) => void}) {
    const [message, setMessage] = useState('')
    const [isFocused, setIsFocused] = useState(false)
    const inputRef = useRef<HTMLInputElement>()

    useEffect(() => {
        const shortcuts = [
            GlobalShortcutManager.register([Keys.enter], sendMessageHandler, () => isFocused),
            GlobalShortcutManager.register([Keys.esc], () => inputRef?.current?.focus()),
        ]
        return () => shortcuts.forEach(GlobalShortcutManager.unregister)
    }, [isFocused, message, inputRef])

    return <Column>
        <Row alignItems='flex-end'>
            <TextArea
                ref={inputRef}
                value={message}
                onChange={setMessage}
                charLimit={2048}
                placeholder='Write a message...'
                fontSize='14px'
                width='100%'
                height='36px'
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                autoFocus
            />
            <Gap size={16}/>
            <Button size='small' height='36px' onClick={sendMessageHandler}>Send</Button>
        </Row>
        <Gap size={20}/>
    </Column>

    function sendMessageHandler() {
        if (message) {
            sendMessage(message)
            setMessage('')
        }
    }
}