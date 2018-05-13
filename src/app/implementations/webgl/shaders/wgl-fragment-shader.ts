import { FragmentShader } from '../../../api/shaders/fragment-shader';
import { WglShaderGlobalScope } from './source/scope/wgl-shader-global-scope';
import { WglShader } from './wgl-shader';

export class WglFragmentShader extends WglShader implements FragmentShader {

    constructor(gl: WebGLRenderingContext) {
        super(gl, gl.FRAGMENT_SHADER);
    }

    public parse(): string {
        const parsedShader = this.globalScope.parse();
        return parsedShader;
    }

}
