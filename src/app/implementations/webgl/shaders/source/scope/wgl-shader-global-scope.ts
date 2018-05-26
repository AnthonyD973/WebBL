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
import { ShaderUniform } from '../../../../../api/shaders/source/expression/lvalues/shader-uniform';
import { WglShaderUniform } from '../expression/lvalues/wgl-shader-uniform';
import { WglShaderLValueDeclarationParser } from '../expression/lvalues/lvalue-parsers/wgl-shader-l-value-declaration-parser';
import { WglShaderVariable } from '../expression/lvalues/wgl-shader-variable';

export abstract class WglShaderGlobalScope implements ShaderGlobalScope {

    public readonly uniforms = new Map<string, ShaderUniform>();
    public readonly inputs = new Map<string, ShaderInput>();
    public readonly outputs = new Map<string, ShaderOutput>();
    public readonly functions = new Map<string, ShaderFunction>();
    public readonly parent: Shader;

    constructor(parent: Shader) {
        this.parent = parent;
    }

    public parse(): string {
        this.assertMainExists();

        let parsedUniforms = '';
        this.uniforms.forEach(uniform => parsedUniforms = parsedUniforms + new WglShaderLValueDeclarationParser(uniform).parse() + '\n');
        let parsedInputs = '';
        this.inputs.forEach(input => parsedInputs = parsedInputs + new WglShaderLValueDeclarationParser(input).parse() + '\n');
        let parsedOutputs = '';
        this.outputs.forEach(output => parsedOutputs = parsedOutputs + new WglShaderLValueDeclarationParser(output).parse() + '\n');
        let parsedFunctions = '';
        this.functions.forEach(func => parsedFunctions = parsedFunctions + func.parse() + '\n\n');

        const parsedShader = parsedUniforms + '\n' + parsedInputs + '\n' + parsedOutputs + '\n' + parsedFunctions;
        return parsedShader;
    }

    public createFunction(name: string, params: WglShaderVariable[], ret: ShaderExpressionType): WglShaderFunction {
        this.assertIdentifierIsValid(name);
        const func = new WglShaderFunction(name, params, ret);
        this.functions.set(name, func);
        return func;
    }

    public createUniform(name: string, type: ShaderExpressionType): ShaderUniform {
        this.assertIdentifierIsValid(name);
        const uniform = new WglShaderUniform(name, type);
        this.uniforms.set(name, uniform);
        return uniform;
    }

    public abstract createInput(name: string, type: ShaderExpressionType): ShaderInput;

    public abstract createOutput(name: string, type: ShaderExpressionType): ShaderOutput;

    protected assertIdentifierIsValid(name: string): void {
        const nameExists = this.uniforms.has(name) || this.inputs.has(name) || this.outputs.has(name) || this.functions.has(name);
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
