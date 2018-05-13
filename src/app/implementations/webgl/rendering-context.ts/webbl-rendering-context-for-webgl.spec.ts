import { WebBLRenderingContextForWebGL } from './webbl-rendering-context-for-webgl';
import { WglTestingVertexShaderValid } from '../shaders/testing/shaders/wgl-testing-vertex-shader-valid';
import { WglTestingFragmentShaderValid } from '../shaders/testing/shaders/wgl-testing-fragment-shader-valid';

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
            expect(bl.createShaderProgram(new WglTestingVertexShaderValid(), new WglTestingFragmentShaderValid())).toBeTruthy();
        });

        it('should throw an error when one of the shaders is null', () => {
            expect(() => bl.createShaderProgram(new WglTestingVertexShaderValid(), undefined)).toThrow();
            expect(() => bl.createShaderProgram(undefined, new WglTestingFragmentShaderValid())).toThrow();
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
