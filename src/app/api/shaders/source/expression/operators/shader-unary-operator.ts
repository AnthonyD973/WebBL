import { ShaderExpression } from '../shader-expression';

export interface ShaderUnaryOperator extends ShaderExpression {

    readonly value: ShaderExpression;

}
