import { ShaderStatement } from '../../../../../api/shaders/source/statement/shader-statement';
import { ShaderExpression } from '../../../../../api/shaders/source/expression/shader-expression';

export class WglShaderStatement implements ShaderStatement {

    public readonly expression: ShaderExpression;

    constructor(expression: ShaderExpression) {
        this.expression = expression;
    }

    public parse(): string {
        return this.expression.parse() + ';';
    }

}
