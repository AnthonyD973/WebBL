import { WglShaderLocalScope } from '../wgl-shader-local-scope';
import { WglShaderFunctionSignature } from '../../expression/types/wgl-shader-function-signature';
import { ShaderLocalScope } from '../../../../../../api/shaders/source/scope/shader-local-scope';

export class WglShaderFunction extends WglShaderLocalScope {

    public readonly name: string;
    public readonly signature: WglShaderFunctionSignature;

    public get scopeName(): string {
        return 'function';
    }

    constructor(name: string, signature: WglShaderFunctionSignature) {
        super(null);
        this.name = name;
        this.signature = signature;
    }

    public parse(): string {
        return null;
    }

}
