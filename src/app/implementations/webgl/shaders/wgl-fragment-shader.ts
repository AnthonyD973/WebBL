import { FragmentShader } from '../../../api/shaders/fragment-shader';
import { WglShaderGlobalScope } from './source/scope/wgl-shader-global-scope';

export class WglFragmentShader implements FragmentShader {

    public readonly globalScope: WglShaderGlobalScope;

    protected gl: WebGLRenderingContext;
    protected glShader: WebGLShader;

    constructor(gl: WebGLRenderingContext) {
        this.gl = gl;
        this.globalScope = new WglShaderGlobalScope();
        this.glShader = this.gl.createShader(this.gl.VERTEX_SHADER);
    }

    public compile(): void {
        this.gl.shaderSource(this.glShader, this.parse());
        if (!this.gl.getShaderParameter(this.glShader, this.gl.COMPILE_STATUS)) {
            throw new Error(`WebGL shader could not compile: ${this.gl.getShaderInfoLog(this.glShader)}`);
        }
    }

    public parse(): string {
        const parsedShader = this.globalScope.parse();
        return parsedShader;
    }

}
