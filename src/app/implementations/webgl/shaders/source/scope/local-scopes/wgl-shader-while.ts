import { WglShaderLocalScope } from '../wgl-shader-local-scope';

export class WglShaderWhile extends WglShaderLocalScope {

    public get scopeName(): string {
        return 'while';
    }

    constructor(parent: WglShaderLocalScope) {
        super(parent);
    }

    public parse(): string {
        return null;
    }

}
