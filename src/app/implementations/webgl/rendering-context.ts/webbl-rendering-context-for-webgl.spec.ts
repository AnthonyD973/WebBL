import { WebBLRenderingContextForWebGL } from './webbl-rendering-context-for-webgl';
import { WglVertexShader } from '../shaders/wgl-vertex-shader';
import { WglFragmentShader } from '../shaders/wgl-fragment-shader';

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

    describe('createShaderProgram', () => {

        it('should return an object', () => {
            expect(bl.createShaderProgram(new WglVertexShader(), new WglFragmentShader())).toBeTruthy();
        });

        it('should throw an error when one of the shaders is null', () => {
            expect(() => bl.createShaderProgram(new WglVertexShader(), undefined)).toThrow();
            expect(() => bl.createShaderProgram(undefined, new WglFragmentShader())).toThrow();
            expect(() => bl.createShaderProgram(undefined, null)).toThrow();
        });

    });

    describe('createVertexShader', () => {

        it('should return an object', () => {
            expect(bl.createVertexShader()).toBeTruthy();
        });

    });

    describe('createFragmentShader', () => {

        it('should return an object', () => {
            expect(bl.createFragmentShader()).toBeTruthy();
        });

    });

});
