import { ShaderAbstractStatement } from './shader-abstract-statement';
import { ShaderExpression } from '../expression/shader-expression';

export interface ShaderBlock extends ShaderAbstractStatement {

    readonly exressions: ShaderExpression[];

}
