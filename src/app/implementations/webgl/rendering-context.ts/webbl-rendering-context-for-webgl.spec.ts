import { WebBLRenderingContextForWebGL } from './webbl-rendering-context-for-webgl';

describe(WebBLRenderingContextForWebGL.name, () => {

    let bl: WebBLRenderingContextForWebGL;
    let canvas: HTMLCanvasElement;

    beforeEach(() => {
        canvas = document.createElement('canvas');
        bl = new WebBLRenderingContextForWebGL(canvas);
    });

    it('should be created', () => {
        expect(bl).toBeTruthy();
        expect(bl.canvas).toBe(canvas);
    });

    it('should not be created when the canvas is null', () => {
        expect(() => new WebBLRenderingContextForWebGL(null)).toThrow();
    });

});
