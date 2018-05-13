import { ShaderProgram } from '../../../api/shaders/shader-program';
import { WglVertexShader } from './wgl-vertex-shader';
import { WglFragmentShader } from './wgl-fragment-shader';

export class WglShaderProgram implements ShaderProgram {

    public readonly vertexShader: WglVertexShader;
    public readonly fragmentShader: WglFragmentShader;

    protected gl: WebGLRenderingContext;
    protected glProgram: WebGLProgram;

    protected hasEnded = false;

    constructor(gl: WebGLRenderingContext, vertexShader: WglVertexShader, fragmentShader: WglFragmentShader) {
        this.gl = gl;
        this.glProgram = this.gl.createProgram();

        this.vertexShader = vertexShader;
        this.fragmentShader = fragmentShader;
    }

    public end(): void {
        this.assertHasNotEnded();

        this.vertexShader.compile();
        this.fragmentShader.compile();

        this.gl.attachShader(this.glProgram, this.vertexShader.glShader);
        this.gl.attachShader(this.glProgram, this.fragmentShader.glShader);

        this.gl.linkProgram(this.glProgram);
        if (this.gl.getProgramParameter(this.glProgram, this.gl.LINK_STATUS)) {
            this.hasEnded = true;
        }
        else {
            throw new Error(`Could not link WebGL program: ${this.gl.getProgramInfoLog(this.glProgram)}`);
        }
    }

    protected assertHasNotEnded(): void {
        if (this.hasEnded) {
            throw new Error(`Cannot perform this operation on shader program: program is already compiled, linked and locked`);
        }
    }

}
