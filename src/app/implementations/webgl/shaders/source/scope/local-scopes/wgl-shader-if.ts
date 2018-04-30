import { WglShaderLocalScope } from '../wgl-shader-local-scope';
import { ShaderIf } from '../../../../../../api/shaders/source/scope/local-scopes/shader-if';

export abstract class WglShaderIf extends WglShaderLocalScope implements ShaderIf {

    public get scopeName(): string {
        return 'if';
    }

    constructor(parent: WglShaderLocalScope) {
        super(parent);
    }

    public elseIf(): any {

    }

    public else(): any {

    }

}
