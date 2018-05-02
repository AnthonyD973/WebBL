import { WglShaderLocalScope } from '../wgl-shader-local-scope';

export class WglShaderEmptyLocalScope extends WglShaderLocalScope {

    public get scopeName(): string {
        return 'empty-scope';
    }

    constructor(parent: WglShaderEmptyLocalScope) {
        super(parent);
    }

    public parse(): string {
        return '';
    }

}
