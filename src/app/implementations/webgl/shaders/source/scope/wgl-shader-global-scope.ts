import { ShaderGlobalScope } from '../../../../../api/shaders/source/scope/shader-global-scope';
import { ShaderInput } from '../../../../../api/shaders/source/expression/lvalues/shader-input';
import { ShaderOutput } from '../../../../../api/shaders/source/expression/lvalues/shader-output';
import { ShaderFunction } from '../../../../../api/shaders/source/scope/local-scopes/shader-function';

export class WglShaderGlobalScope implements ShaderGlobalScope {

    public readonly inputs = new Map<string, ShaderInput>();
    public readonly outputs = new Map<string, ShaderOutput>();
    public readonly functions = new Map<string, ShaderFunction>();

    public parse(): string {
        return null;
    }

    public createFunction(): any {

    }

    public createInput(): any {

    }

    public createOutput(): any {

    }

}
