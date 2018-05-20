import { FragmentShader } from '../../../api/shaders/fragment-shader';
import { WglShaderGlobalScope } from './source/scope/wgl-shader-global-scope';
import { WglShader } from './wgl-shader';
import { ShaderGlobalScope } from '../../../api/shaders/source/scope/shader-global-scope';
import { WglShaderFragmentShaderGlobalScope } from './source/scope/global-scopes/wgl-shader-fragment-shader-global-scope';

export class WglFragmentShader extends WglShader implements FragmentShader {

    public readonly globalScope: ShaderGlobalScope;

    constructor(gl: WebGLRenderingContext) {
        super(gl, gl.FRAGMENT_SHADER);
        this.globalScope = new WglShaderFragmentShaderGlobalScope(this);
    }

    public parse(): string {
        const parsedShader = this.globalScope.parse();
        return parsedShader;
    }

}
