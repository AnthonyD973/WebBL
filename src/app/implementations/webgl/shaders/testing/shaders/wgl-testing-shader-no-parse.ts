import { Shader } from '../../../../../api/shaders/shader';
import { ShaderGlobalScope } from '../../../../../api/shaders/source/scope/shader-global-scope';
import { WglShader } from '../../wgl-shader';
import { WglShaderVertexShaderGlobalScope } from '../../source/scope/global-scopes/wgl-shader-vertex-shader-global-scope';

export class WglTestingShaderNoParse extends WglShader {

    public readonly globalScope: ShaderGlobalScope;

    constructor(gl: WebGLRenderingContext, shaderType: number) {
        super(gl, shaderType);
        this.globalScope = new WglShaderVertexShaderGlobalScope(this);
    }

    public parse(): any {
        throw new Error(`This testing class is built so that the parse method throws an error`);
    }

    public compile(): void {
        this.parse();
    }

}
