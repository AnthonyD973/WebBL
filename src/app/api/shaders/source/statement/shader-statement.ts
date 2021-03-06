import { ShaderAbstractStatement } from './shader-abstract-statement';
import { ShaderExpression } from '../expression/shader-expression';

export interface ShaderStatement extends ShaderAbstractStatement {

    readonly expression: ShaderExpression;

}
