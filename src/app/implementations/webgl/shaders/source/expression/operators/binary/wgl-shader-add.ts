import { ShaderBinaryOperator } from '../../../../../../../api/shaders/source/expression/operators/shader-binary-operator';
import { ShaderExpression } from '../../../../../../../api/shaders/source/expression/shader-expression';
import { ShaderExpressionType } from '../../../../../../../api/shaders/source/expression/shader-expression-type';

export class WglShaderAdd implements ShaderBinaryOperator {

    public readonly lhs: ShaderExpression;
    public readonly rhs: ShaderExpression;
    public readonly type: ShaderExpressionType;

    constructor(lhs: ShaderExpression, rhs: ShaderExpression) {
    }

    public parse(): string {
        return null;
    }

}
