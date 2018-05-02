import { WglShaderLocalScope } from '../wgl-shader-local-scope';
import { WglShaderFunctionSignature } from '../../expression/types/wgl-shader-function-signature';
import { ShaderLocalScope } from '../../../../../../api/shaders/source/scope/shader-local-scope';
import { WglShaderConfig } from '../../../util/wgl-shader-config';
import { WglShaderVariable } from '../../expression/lvalues/wgl-shader-variable';
import { ShaderFunction } from '../../../../../../api/shaders/source/scope/local-scopes/shader-function';
import { ShaderExpressionType } from '../../../../../../api/shaders/source/expression/shader-expression-type';

export class WglShaderFunction extends WglShaderLocalScope implements ShaderFunction {

    public readonly name: string;
    public readonly params: WglShaderVariable[];
    public readonly ret: ShaderExpressionType;

    public get signature(): WglShaderFunctionSignature {
        return null;
    }

    public get scopeName(): string {
        return 'function';
    }

    constructor(name: string, params: WglShaderVariable[], ret: ShaderExpressionType) {
        super(null); // TODO Change parent to global scope?
        if (!WglShaderConfig.IDENTIFIER_REGEX.test(name)) {
            throw new Error(`"${name}" is not a valid identifier`);
        }
        this.name = name;
        this.params = params;
        this.ret = ret;
    }

    public parse(): string {
        return null;
    }

}
