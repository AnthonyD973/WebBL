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

    public createShaderProgram(vs: WglVertexShader, fs: WglFragmentShader): WglShaderProgram {
        return new WglShaderProgram(this.gl, vs, fs);
    }

    public createVertexShader(): WglVertexShader {
        return new WglVertexShader(this.gl);
    }

    public createFragmentShader(): WglFragmentShader {
        return new WglFragmentShader(this.gl);
    }

    public useProgram(program: WglShaderProgram): void {
        try {
            program.end();
        } catch (e) { }

        this.gl.useProgram(program.glProgram);
    }

}
