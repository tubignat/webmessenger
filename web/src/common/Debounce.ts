export function debounce<T, R>(interval: number, func: (input: T) => Promise<R>, callback: (input: R) => void): (input: T) => void {
    let timeoutId: number | null = null
    let lastId = 0
    return input => {
        if (timeoutId) {
            clearTimeout(timeoutId)
        }

        lastId++
        const myId = lastId
        timeoutId = setTimeout(async () => {
            const result = await func(input)
            if (myId === lastId) {
                callback(result)
            }
        }, interval)
    }
}
