import { ShaderGlobalScope } from '../../../../../api/shaders/source/scope/shader-global-scope';
import { ShaderInput } from '../../../../../api/shaders/source/expression/lvalues/shader-input';
import { ShaderOutput } from '../../../../../api/shaders/source/expression/lvalues/shader-output';
import { ShaderFunction } from '../../../../../api/shaders/source/scope/local-scopes/shader-function';
import { WglShaderFunctionSignature } from '../expression/types/wgl-shader-function-signature';
import { ShaderExpressionType } from '../../../../../api/shaders/source/expression/shader-expression-type';
import { ShaderLocalScope } from '../../../../../api/shaders/source/scope/shader-local-scope';
import { WglShaderFunction } from './local-scopes/wgl-shader-function';
import { WglShaderInput } from '../expression/lvalues/wgl-shader-input';
import { WglShaderOutput } from '../expression/lvalues/wgl-shader-output';
import { ShaderVariable } from '../../../../../api/shaders/source/expression/lvalues/shader-variable';
import { Shader } from '../../../../../api/shaders/shader';

export abstract class WglShaderGlobalScope implements ShaderGlobalScope {

    public readonly inputs = new Map<string, ShaderInput>();
    public readonly outputs = new Map<string, ShaderOutput>();
    public readonly functions = new Map<string, ShaderFunction>();
    public readonly parent: Shader;

    constructor(parent: Shader) {
        this.parent = parent;
    }

    public parse(): string {
        this.assertMainExists();

        let parsedInputs = '';
        this.inputs.forEach(input => parsedInputs = parsedInputs + input.parse() + '\n');
        let parsedOutputs = '';
        this.outputs.forEach(output => parsedOutputs = parsedOutputs + output.parse() + '\n');
        let parsedFunctions = '';
        this.functions.forEach(func => parsedFunctions = parsedFunctions + func.parse() + '\n\n');

        const parsedShader = parsedInputs + '\n' + parsedOutputs + '\n' + parsedFunctions;
        return parsedShader;
    }

    public createFunction(name: string, params: ShaderVariable[], ret: ShaderExpressionType): WglShaderFunction {
        this.assertIdentifierIsValid(name);
        const func = new WglShaderFunction(name, params, ret);
        this.functions.set(name, func);
        return func;
    }

    public abstract createInput(name: string, type: ShaderExpressionType): ShaderInput;

    public abstract createOutput(name: string, type: ShaderExpressionType): ShaderOutput;

    protected assertIdentifierIsValid(name: string): void {
        const nameExists = this.inputs.has(name) || this.outputs.has(name) || this.functions.has(name);
        if (nameExists) {
            throw new Error(`Cannot create symbol "${name}" in global context: an existing symbol already has this name`);
        }
    }

    protected assertMainExists(): void {
        const hasMain = this.functions.has('main');
        if (!hasMain) {
            throw new Error(`Cannot parse the global scope: No "main" function defined`);
        }
    }

}
