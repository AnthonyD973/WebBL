import { ShaderLocalScope } from '../shader-local-scope';
import { ShaderElseIf } from './shader-else-if';
import { ShaderElse } from './shader-else';
import { ShaderExpression } from '../../expression/shader-expression';
import { ShaderScope } from '../shader-scope';

export interface ShaderIf extends ShaderLocalScope {

    elseIf(): ShaderElseIf;
    else(): ShaderElse;

}
