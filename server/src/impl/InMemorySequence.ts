export class InMemorySequence {
    private current = -1

    get(): number {
        this.current++
        return this.current
    }
}
