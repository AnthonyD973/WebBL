import { Shader } from '../../../../../api/shaders/shader';
import { ShaderGlobalScope } from '../../../../../api/shaders/source/scope/shader-global-scope';
import { WglShaderGlobalScope } from '../../source/scope/wgl-shader-global-scope';
import { ShaderScope } from '../../../../../api/shaders/source/scope/shader-scope';

export class WglTestingShader implements Shader {

    public readonly globalScope: ShaderGlobalScope;

    constructor() {
        this.globalScope = new WglShaderGlobalScope(this);
    }

    public parse(): void {
        return this.globalScope.parse();
    }

    public compile(): void {
        this.parse();
    }

    public addChild(c: ShaderScope): void {
        throw new Error(`Cannot add children to a shader, not even the test shader`);
    }

}
