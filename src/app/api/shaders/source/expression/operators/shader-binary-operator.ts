import { ShaderExpression } from '../shader-expression';
import { ShaderExpressionType } from '../shader-expression-type';

export interface ShaderBinaryOperator extends ShaderExpression {

    readonly lhs: ShaderExpression;
    readonly rhs: ShaderExpression;

}
