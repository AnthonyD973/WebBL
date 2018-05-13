import { WebBLRenderingContext } from '../../../api/rendering-context/webbl-rendering-context';
import { VertexShader } from '../../../api/shaders/vertex-shader';
import { FragmentShader } from '../../../api/shaders/fragment-shader';
import { ShaderProgram } from '../../../api/shaders/shader-program';

export class WebBLRenderingContextForWebGL implements WebBLRenderingContext {

    public get canvas(): HTMLCanvasElement {
        return this.gl.canvas;
    }

    private gl: WebGLRenderingContext;

    constructor(canvas: HTMLCanvasElement) {
        if (canvas != null) {
            this.gl = canvas.getContext('webgl');
        }
        else {
            throw new Error(`Cannot create WebBL rendering context on a null canvas`);
        }
    }

    public createShaderProgram(vs: VertexShader, fs: FragmentShader): ShaderProgram {
        return null;
    }

    public createVertexShader(): VertexShader {
        return null;
    }

    public createFragmentShader(): FragmentShader {
        return null;
    }

}
