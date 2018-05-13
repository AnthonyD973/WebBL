import { Shader } from '../../../api/shaders/shader';
import { WglShaderGlobalScope } from './source/scope/wgl-shader-global-scope';

export abstract class WglShader implements Shader {

    public readonly globalScope: WglShaderGlobalScope;

    protected gl: WebGLRenderingContext;
    protected glShader: WebGLShader;

    constructor(gl: WebGLRenderingContext, shaderType: number) {
        this.gl = gl;
        this.glShader = this.gl.createShader(shaderType);
    }

    public compile(): void {

    }

    public abstract parse(): string;

}
