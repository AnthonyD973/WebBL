import { VertexShader } from '../../../api/shaders/vertex-shader';
import { WglShaderGlobalScope } from './source/scope/wgl-shader-global-scope';
import { WglShader } from './wgl-shader';

export class WglVertexShader extends WglShader implements VertexShader {

    constructor(gl: WebGLRenderingContext) {
        super(gl, gl.VERTEX_SHADER);
    }

    public parse(): string {
        const parsedShader = this.globalScope.parse();
        return parsedShader;
    }

}
