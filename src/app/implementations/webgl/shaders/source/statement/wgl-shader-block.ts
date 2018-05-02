import { ShaderBlock } from '../../../../../api/shaders/source/statement/shader-block';
import { ShaderExpression } from '../../../../../api/shaders/source/expression/shader-expression';

export class WglShaderBlock implements ShaderBlock {

    public expressions: ShaderExpression[];

    constructor(expressions: ShaderExpression[]) {
        this.expressions = expressions;
    }

    public parse(): string {
        const parsedExpressions = this.expressions.reduce((acc, expr) => {
            return acc + expr.parse() + ';\n';
        }, '');
        return '{\n' + parsedExpressions + '}';
    }

}
