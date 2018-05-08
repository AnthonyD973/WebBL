import { Shader } from '../../../../../api/shaders/shader';
import { ShaderGlobalScope } from '../../../../../api/shaders/source/scope/shader-global-scope';
import { WglShaderGlobalScope } from '../../source/scope/wgl-shader-global-scope';

export class WglTestingShader implements Shader {

    public readonly globalScope: ShaderGlobalScope;

    constructor() {
        this.globalScope = new WglShaderGlobalScope();
    }

    public parse(): void {
        return this.globalScope.parse();
    }

}
