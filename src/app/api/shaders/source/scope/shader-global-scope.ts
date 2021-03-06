import { ShaderScope } from './shader-scope';
import { ShaderInput } from '../expression/lvalues/shader-input';
import { ShaderOutput } from '../expression/lvalues/shader-output';
import { ShaderFunction } from './local-scopes/shader-function';
import { ShaderFunctionSignature } from '../expression/types/shader-function-signature';
import { ShaderExpressionType } from '../expression/shader-expression-type';
import { ShaderVariable } from '../expression/lvalues/shader-variable';

export interface ShaderGlobalScope extends ShaderScope {

    readonly inputs: Map<string, ShaderInput>;
    readonly outputs: Map<string, ShaderOutput>;
    readonly functions: Map<string, ShaderFunction>;

    createFunction(name: string, params: ShaderVariable[], ret: ShaderExpressionType): ShaderFunction;
    createInput(name: string, type: ShaderExpressionType): ShaderInput;
    createOutput(name: string, type: ShaderExpressionType): ShaderOutput;

}
