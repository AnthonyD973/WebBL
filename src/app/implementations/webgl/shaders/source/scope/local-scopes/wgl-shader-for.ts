import { WglShaderLocalScope } from '../wgl-shader-local-scope';

export class WglShaderFor extends WglShaderLocalScope {

    public get scopeName(): string {
        return 'for';
    }

    constructor(parent: WglShaderLocalScope) {
        super(parent);
    }

    public parse(): string {
        return null;
    }

}
