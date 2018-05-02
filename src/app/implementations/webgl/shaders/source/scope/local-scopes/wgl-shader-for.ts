import { WglShaderLocalScope } from '../wgl-shader-local-scope';

export class WglShaderFor extends WglShaderLocalScope {

    public get scopeName(): string {
        return 'for';
    }

    constructor() {
        super();
    }

    public parse(): string {
        return null;
    }

}
