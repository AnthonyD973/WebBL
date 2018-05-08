import { VertexShader } from './vertex-shader';
import { FragmentShader } from './fragment-shader';

export interface ShaderProgram {

    readonly vertexShader: VertexShader;
    readonly fragmentShader: FragmentShader;

}
