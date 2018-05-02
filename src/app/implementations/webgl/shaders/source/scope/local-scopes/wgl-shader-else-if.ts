import { WglShaderIf } from './wgl-shader-if';
import { WglShaderLocalScope } from '../wgl-shader-local-scope';
import { ShaderExpression } from '../../../../../../api/shaders/source/expression/shader-expression';

export class WglShaderElseIf extends WglShaderIf {

    public get scopeName(): string {
        return 'else if';
    }

    constructor(condExpression: ShaderExpression) {
        super(condExpression);
    }

    public parse(): string {
        return null;
    }

}
