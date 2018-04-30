import { ShaderLocalScope } from '../shader-local-scope';
import { ShaderExpression } from '../../expression/shader-expression';
import { ShaderScope } from '../shader-scope';

export interface ShaderWhile extends ShaderLocalScope {

    condExpr: ShaderExpression;

}
