export class WglError extends Error  {

    public readonly message: string;

    constructor(message: string) {
        super('WebGL Error: ' + message);
    }

}
