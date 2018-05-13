import { WebBLRenderingContext } from '../../../api/rendering-context/webbl-rendering-context';
import { VertexShader } from '../../../api/shaders/vertex-shader';
import { FragmentShader } from '../../../api/shaders/fragment-shader';
import { ShaderProgram } from '../../../api/shaders/shader-program';
import { WglShaderProgram } from '../shaders/wgl-shader-program';
import { WglVertexShader } from '../shaders/wgl-vertex-shader';
import { WglFragmentShader } from '../shaders/wgl-fragment-shader';

export class WebBLRenderingContextForWebGL implements WebBLRenderingContext {

    public get canvas(): HTMLCanvasElement {
        return this.gl.canvas;
    }

    private gl: WebGLRenderingContext;

    constructor(canvas: HTMLCanvasElement) {
        if (canvas != null) {
            this.gl = canvas.getContext('webgl');
            if (this.gl == null) {
                throw new Error(`WebBL could not access the canvas' webgl rendering context. `
                    + `Did you already call "getContext" on this canvas?`);
            }
        }
        else {
            throw new Error(`Cannot create WebBL rendering context on a null canvas`);
        }
    }

    public createShaderProgram(vs: VertexShader, fs: FragmentShader): ShaderProgram {
        return new WglShaderProgram(vs, fs);
    }

    public createVertexShader(): VertexShader {
        return new WglVertexShader();
    }

    public createFragmentShader(): FragmentShader {
        return new WglFragmentShader();
    }

}
