import { VertexShader } from '../../../api/shaders/vertex-shader';
import { WglShaderGlobalScope } from './source/scope/wgl-shader-global-scope';
import { WglShader } from './wgl-shader';
import { ShaderGlobalScope } from '../../../api/shaders/source/scope/shader-global-scope';
import { WglShaderVertexShaderGlobalScope } from './source/scope/global-scopes/wgl-shader-vertex-shader-global-scope';

export class WglVertexShader extends WglShader implements VertexShader {

    public readonly globalScope: ShaderGlobalScope;

    constructor(gl: WebGLRenderingContext) {
        super(gl, gl.VERTEX_SHADER);
        this.globalScope = new WglShaderVertexShaderGlobalScope(this);
    }

    public parse(): string {
        const parsedShader = this.globalScope.parse();
        return parsedShader;
    }

}
