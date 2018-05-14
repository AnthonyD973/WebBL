import { WebBLRenderingContextForWebGL } from './webbl-rendering-context-for-webgl';
import { WglTestingVertexShaderValid } from '../shaders/testing/shaders/wgl-testing-vertex-shader-valid';
import { WglTestingFragmentShaderValid } from '../shaders/testing/shaders/wgl-testing-fragment-shader-valid';
import { WglShaderVoidType } from '../shaders/source/expression/types/wgl-shader-void-type';

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

    describe('useProgram', () => {

        it('should not throw an error when the program already ended', () => {
            const vs = bl.createVertexShader();
            vs.globalScope.createFunction('main', [], new WglShaderVoidType());
            const fs = bl.createFragmentShader();
            fs.globalScope.createFunction('main', [], new WglShaderVoidType());
            const program = bl.createShaderProgram(vs, fs);
            program.end();
            bl.useProgram(program);
        });

        it('should end the program when is not yet ended', () => {
            const vs = bl.createVertexShader();
            vs.globalScope.createFunction('main', [], new WglShaderVoidType());
            const fs = bl.createFragmentShader();
            fs.globalScope.createFunction('main', [], new WglShaderVoidType());
            const program = bl.createShaderProgram(vs, fs);
            bl.useProgram(program);
            expect(() => program.end()).toThrow();
        });

    });

});
