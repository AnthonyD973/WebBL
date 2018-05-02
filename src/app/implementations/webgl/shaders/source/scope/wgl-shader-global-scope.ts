import { ShaderGlobalScope } from '../../../../../api/shaders/source/scope/shader-global-scope';
import { ShaderInput } from '../../../../../api/shaders/source/expression/lvalues/shader-input';
import { ShaderOutput } from '../../../../../api/shaders/source/expression/lvalues/shader-output';
import { ShaderFunction } from '../../../../../api/shaders/source/scope/local-scopes/shader-function';
import { WglShaderFunctionSignature } from '../expression/types/wgl-shader-function-signature';
import { ShaderExpressionType } from '../../../../../api/shaders/source/expression/shader-expression-type';
import { ShaderLocalScope } from '../../../../../api/shaders/source/scope/shader-local-scope';

export class WglShaderGlobalScope implements ShaderGlobalScope {

    public readonly inputs = new Map<string, ShaderInput>();
    public readonly outputs = new Map<string, ShaderOutput>();
    public readonly functions = new Map<string, ShaderFunction>();

    public parse(): string {
        return null;
    }

    public createFunction(name: string, signature: WglShaderFunctionSignature): any {

    }

    public createInput(name: string, type: ShaderExpressionType): any {

    }

    public createOutput(name: string, type: ShaderExpressionType): any {

    }

    public makeParentOf(c: ShaderLocalScope): void {

    }

}
