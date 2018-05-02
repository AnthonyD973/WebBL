import { WglShaderLocalScope } from '../wgl-shader-local-scope';

export class WglShaderWhile extends WglShaderLocalScope {

    public get scopeName(): string {
        return 'while';
    }

    constructor() {
        super();
    }

    public parse(): string {
        return null;
    }

}
