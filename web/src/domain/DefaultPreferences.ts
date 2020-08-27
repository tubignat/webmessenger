export function generateKey() {
    const unixTimestamp = Math.floor(Date.now() / 1000).toString()
    const random = Math.floor(Math.random() * 4294967296).toString()

    return Number.parseInt(random + unixTimestamp).toString(36)
}

export function generateName() {
    return "Reasonable Peacocks"
}