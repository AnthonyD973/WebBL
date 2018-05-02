import { WglShaderLocalScope } from '../wgl-shader-local-scope';
import { WglShaderFunctionSignature } from '../../expression/types/wgl-shader-function-signature';
import { ShaderLocalScope } from '../../../../../../api/shaders/source/scope/shader-local-scope';
import { WglShaderConfig } from '../../../util/wgl-shader-config';
import { WglShaderVariable } from '../../expression/lvalues/wgl-shader-variable';
import { ShaderFunction } from '../../../../../../api/shaders/source/scope/local-scopes/shader-function';

export class WglShaderFunction extends WglShaderLocalScope implements ShaderFunction {

    public readonly name: string;
    public readonly params: WglShaderVariable[];

    public get signature(): WglShaderFunctionSignature {
        return null;
    }

    public get scopeName(): string {
        return 'function';
    }

    constructor(name: string, params: WglShaderVariable[]) {
        super(null);
        if (!WglShaderConfig.IDENTIFIER_REGEX.test(name)) {
            throw new Error(`"${name}" is not a valid identifier`);
        }
        this.name = name;
        this.params = params;
    }

    public parse(): string {
        return null;
    }

}
