import { WglShaderIf } from './wgl-shader-if';
import { WglShaderLocalScope } from '../wgl-shader-local-scope';

export class WglShaderElseIf extends WglShaderIf {

    public get scopeName(): string {
        return 'else if';
    }

    constructor(parent: WglShaderLocalScope) {
        super(parent);
    }

}
