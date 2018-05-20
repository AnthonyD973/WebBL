import { Shader } from '../../../api/shaders/shader';
import { WglShaderGlobalScope } from './source/scope/wgl-shader-global-scope';
import { ShaderScope } from '../../../api/shaders/source/scope/shader-scope';
import { ShaderGlobalScope } from '../../../api/shaders/source/scope/shader-global-scope';

export abstract class WglShader implements Shader {

    public readonly glShader: WebGLShader;

    protected gl: WebGLRenderingContext;

    public abstract get globalScope(): ShaderGlobalScope;

    constructor(gl: WebGLRenderingContext, shaderType: number) {
        this.gl = gl;
        this.glShader = this.gl.createShader(shaderType);
    }

    public compile(): void {
        this.gl.shaderSource(this.glShader, this.parse());
        this.gl.compileShader(this.glShader);
        if (!this.gl.getShaderParameter(this.glShader, this.gl.COMPILE_STATUS)) {
            throw new Error(`WebGL shader could not compile: ${this.gl.getShaderInfoLog(this.glShader)}`);
        }
    }

    public abstract parse(): string;

}
