import { ShaderScope } from './shader-scope';
import { ShaderInput } from '../expression/lvalues/shader-input';
import { ShaderOutput } from '../expression/lvalues/shader-output';
import { ShaderFunction } from './local-scopes/shader-function';

export interface ShaderGlobalScope extends ShaderScope {

    readonly inputs: Map<string, ShaderInput>;
    readonly outputs: Map<string, ShaderOutput>;
    readonly functions: Map<string, ShaderFunction>;

    createFunction(): ShaderFunction;
    createInput(): ShaderInput;
    createOutput(): ShaderOutput;

}
