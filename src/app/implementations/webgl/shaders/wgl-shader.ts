import { Shader } from '../../../api/shaders/shader';
import { WglShaderGlobalScope } from './source/scope/wgl-shader-global-scope';
import { ShaderScope } from '../../../api/shaders/source/scope/shader-scope';

export abstract class WglShader implements Shader {

    public readonly globalScope: WglShaderGlobalScope;
    public readonly glShader: WebGLShader;

    protected gl: WebGLRenderingContext;

    constructor(gl: WebGLRenderingContext, shaderType: number) {
        this.gl = gl;
        this.glShader = this.gl.createShader(shaderType);
        this.globalScope = new WglShaderGlobalScope(this);
    }

    public compile(): void {
        this.gl.shaderSource(this.glShader, this.parse());
        this.gl.compileShader(this.glShader);
        if (!this.gl.getShaderParameter(this.glShader, this.gl.COMPILE_STATUS)) {
            throw new Error(`WebGL shader could not compile: ${this.gl.getShaderInfoLog(this.glShader)}`);
        }
    }

    public abstract parse(): string;

    public addChild(c: ShaderScope): void {
        throw new Error(`Cannot add children to a shader`);
    }

}
