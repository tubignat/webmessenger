// export const host = window.location.host
export const host = "webchat.com"

export function generateKey() {
    const unixTimestamp = Math.floor(Date.now() / 1000).toString()
    const random = Math.floor(Math.random() * 4294967296).toString()

    return Number.parseInt(random + unixTimestamp).toString(36)
}

const adjectives = [
    "Reasonable", "Anonymous", "Shady", "Strange", "Weird", "Moody", "Cheerful", "Gracious", "Forgetful", "Forbidden",
    "Kind", "Greedy", "Polite", "Dirty", "Generous", "Evil", "Mean", "Supportive", "Loving", "Hateful", "Gentle"
]

const nouns = [
    "Peacock", "Cat", "Dog", "Elephant", "Marmot", "Pig", "Giraffe", "Plant", "Dandelion", "Rose", "Animal", "Wolf",
    "Snail", "Midge", "Mosquito", "Grasshopper", "Ant", "Spider", "Cricket", "Lion", "Tiger", "Groundhog", "Monkey"
]

export function generateName(plural: boolean) {
    return `${randomElement(adjectives)} ${randomElement(nouns)}${plural ? 's' : ''}`
}

function randomElement<T>(array: T[]) {
    const index = Math.floor(Math.random() * Math.floor(array.length));
    return array[index]
}
