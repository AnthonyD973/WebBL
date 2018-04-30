import { ShaderScope } from './shader-scope';
import { ShaderFor } from './local-scopes/shader-for';
import { ShaderWhile } from './local-scopes/shader-while';
import { ShaderExpression } from '../expression/shader-expression';

export interface ShaderLocalScope extends ShaderScope {

    readonly parent: ShaderScope;
    readonly scopeName: string;

    end(): void;

    if(condExpr: ShaderExpression): ShaderLocalScope;
    for(initExpr: ShaderExpression, condExpr: ShaderExpression, loopExpr: ShaderExpression): ShaderFor;
    while(condExpr: ShaderExpression): ShaderWhile;

}
