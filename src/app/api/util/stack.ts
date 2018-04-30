export class Stack<T> {

    private data: T[] = [];

    public push(value: T): void {
        this.data.push(value);
    }

    public pop(): T {
        if (this.length > 0) {
            return this.data.pop();
        }
        else {
            throw new Error(`Cannot pop: Stack empty`);
        }
    }

    public top(): T {
        if (this.data.length > 0) {
            return this.data[this.data.length - 1];
        }
        else {
            throw new Error(`Cannot fetch top: Stack empty`);
        }
    }

    public get length(): number {
        return this.data.length;
    }

}
