import { ShaderProgram } from '../../../api/shaders/shader-program';
import { FragmentShader } from '../../../api/shaders/fragment-shader';
import { VertexShader } from '../../../api/shaders/vertex-shader';

export class WglShaderProgram implements ShaderProgram {

    public readonly vertexShader: VertexShader;
    public readonly fragmentShader: FragmentShader;

    constructor(vertexShader: VertexShader, fragmentShader: FragmentShader) {
    }

}
