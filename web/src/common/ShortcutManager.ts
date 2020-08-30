function isMacintosh() {
    return navigator.platform.indexOf('Mac') > -1
}

function keysToString(pressedKeys: string[]) {
    return pressedKeys.sort().join(',')
}

class ShortcutManager {
    private shortcuts: Shortcut[] = []

    constructor() {
        document.onkeydown = (e) => {
            const pressedKeysString = keysToString(this.getPressedKeys(e))
            const availableShortcuts = this.shortcuts
                .filter(s => keysToString(s.keyCombination) === pressedKeysString)
                .filter(s => s.shouldFire())

            if (availableShortcuts.length !== 0) {
                availableShortcuts[availableShortcuts.length - 1].action()
                e.preventDefault()
            }
        }
    }

    private getPressedKeys = (e: KeyboardEvent) => [
        e.code,
        e.metaKey && isMacintosh() ? Keys.control : '',
        e.metaKey && !isMacintosh() ? Keys.meta : '',
        e.ctrlKey && isMacintosh() ? Keys.meta : '',
        e.ctrlKey && !isMacintosh() ? Keys.control : '',
        e.altKey ? Keys.alt : '',
        e.shiftKey ? Keys.shift : ''
    ]
        .filter(k => k !== '')
        .sort()

    register = (keyCombination: string[], action: () => void, shouldFire?: () => boolean) => {
        const shortcut = {keyCombination: keyCombination, shouldFire: shouldFire ?? (() => true), action: action}
        this.shortcuts.push(shortcut)

        return shortcut
    }

    unregister = (shortcut: Shortcut) => {
        this.shortcuts = this.shortcuts.filter(s => s !== shortcut)
    }
}

export const Keys = {
    enter: 'Enter',
    control: 'Control',
    meta: 'Meta',
    shift: 'Shift',
    alt: 'Alt',
    esc: 'Escape',
    f: 'KeyF',
    a: 'KeyA',
}

export interface Shortcut {
    keyCombination: string[]
    action: () => void
    shouldFire: () => boolean
}

export const GlobalShortcutManager = new ShortcutManager()
