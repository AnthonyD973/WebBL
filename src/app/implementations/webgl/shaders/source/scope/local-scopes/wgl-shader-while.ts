import { WglShaderLocalScope } from '../wgl-shader-local-scope';
import { ShaderWhile } from '../../../../../../api/shaders/source/scope/local-scopes/shader-while';
import { ShaderExpression } from '../../../../../../api/shaders/source/expression/shader-expression';

const TOKEN = 'while';

export class WglShaderWhile extends WglShaderLocalScope implements ShaderWhile {

    public readonly condition: ShaderExpression;

    public get scopeName(): string {
        return 'while';
    }

    constructor(condition: ShaderExpression) {
        super();
    }

    public parse(): string {
        return null;
    }

}
