import { ShaderExpression } from '../shader-expression';
import { ShaderFunction } from '../../scope/local-scopes/shader-function';

export interface ShaderFunctionCall extends ShaderExpression {

    readonly func: ShaderFunction;
    readonly params: ShaderExpression[];

}
