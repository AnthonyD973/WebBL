import { ShaderProgram } from '../../../api/shaders/shader-program';
import { FragmentShader } from '../../../api/shaders/fragment-shader';
import { VertexShader } from '../../../api/shaders/vertex-shader';

export class WglShaderProgram implements ShaderProgram {

    public readonly vertexShader: VertexShader;
    public readonly fragmentShader: FragmentShader;

    protected vertexWebGlSource: string;
    protected fragmentWebGlSource: string;

    protected gl: WebGLRenderingContext;
    protected glProgram: WebGLProgram;

    constructor(gl: WebGLRenderingContext, vertexShader: VertexShader, fragmentShader: FragmentShader) {
        this.gl = gl;
        this.vertexShader = vertexShader;
        this.fragmentShader = fragmentShader;
        this.vertexWebGlSource = this.vertexShader.parse();
        this.fragmentWebGlSource = this.fragmentShader.parse();
    }

}
