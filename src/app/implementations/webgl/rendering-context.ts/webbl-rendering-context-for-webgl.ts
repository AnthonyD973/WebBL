import { WebBLRenderingContext } from '../../../api/rendering-context/webbl-rendering-context';

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

}
