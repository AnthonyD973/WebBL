import { ShaderLocalScope } from '../shader-local-scope';
import { ShaderExpression } from '../../expression/shader-expression';
import { ShaderScope } from '../shader-scope';

export interface ShaderFor extends ShaderLocalScope {

    readonly init: ShaderExpression;
    readonly condition: ShaderExpression;
    readonly loop: ShaderExpression;

}
