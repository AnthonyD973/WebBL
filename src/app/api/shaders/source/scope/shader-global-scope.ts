import { ShaderScope } from './shader-scope';
import { ShaderInput } from '../expression/lvalues/shader-input';
import { ShaderOutput } from '../expression/lvalues/shader-output';
import { ShaderFunction } from './local-scopes/shader-function';
import { ShaderFunctionSignature } from '../expression/types/shader-function-signature';
import { ShaderExpressionType } from '../expression/shader-expression-type';
import { ShaderVariable } from '../expression/lvalues/shader-variable';
import { Shader } from '../../shader';
import { ShaderUniform } from '../expression/lvalues/shader-uniform';

export interface ShaderGlobalScope extends ShaderScope {

    readonly uniforms: Map<string, ShaderUniform>;
    readonly inputs: Map<string, ShaderInput>;
    readonly outputs: Map<string, ShaderOutput>;
    readonly functions: Map<string, ShaderFunction>;
    readonly parent: Shader;

    createFunction(name: string, params: ShaderVariable[], ret: ShaderExpressionType): ShaderFunction;
    createUniform(name: string, type: ShaderExpressionType): ShaderUniform;
    createInput(name: string, type: ShaderExpressionType): ShaderInput;
    createOutput(name: string, type: ShaderExpressionType): ShaderOutput;

}
