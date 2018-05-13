import { VertexShader } from '../shaders/vertex-shader';
import { FragmentShader } from '../shaders/fragment-shader';
import { ShaderProgram } from '../shaders/shader-program';

export interface WebBLRenderingContext {

    readonly canvas: HTMLCanvasElement;

    createShaderProgram(vs: VertexShader, fs: FragmentShader): ShaderProgram;
    createVertexShader(): VertexShader;
    createFragmentShader(): FragmentShader;

}
