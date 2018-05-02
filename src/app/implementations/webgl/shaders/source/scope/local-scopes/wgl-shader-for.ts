import { WglShaderLocalScope } from '../wgl-shader-local-scope';
import { ShaderFor } from '../../../../../../api/shaders/source/scope/local-scopes/shader-for';
import { ShaderExpression } from '../../../../../../api/shaders/source/expression/shader-expression';

const TOKEN = 'for';

export class WglShaderFor extends WglShaderLocalScope implements ShaderFor {

    public readonly init: ShaderExpression;
    public readonly condition: ShaderExpression;
    public readonly loop: ShaderExpression;

    public get scopeName(): string {
        return 'for';
    }

    constructor(init: ShaderExpression, condition: ShaderExpression, loop: ShaderExpression) {
        super();
    }

    public parse(): string {
        return null;
    }

}
