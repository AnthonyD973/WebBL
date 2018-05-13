import { Shader } from '../../../api/shaders/shader';
import { WglShaderGlobalScope } from './source/scope/wgl-shader-global-scope';

export abstract class WglShader implements Shader {

    public readonly globalScope: WglShaderGlobalScope;

    protected gl: WebGLRenderingContext;
    protected glShader: WebGLShader;

    constructor(gl: WebGLRenderingContext, shaderType: number) {
        this.gl = gl;
        this.glShader = this.gl.createShader(shaderType);
        this.globalScope = new WglShaderGlobalScope();
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
