import { ShaderLocalScope } from '../shader-local-scope';
import { ShaderExpression } from '../../expression/shader-expression';
import { ShaderScope } from '../shader-scope';

export interface ShaderFor extends ShaderLocalScope {

    readonly initExpr: ShaderExpression;
    readonly condExpr: ShaderExpression;
    readonly loopExpr: ShaderExpression;

}
