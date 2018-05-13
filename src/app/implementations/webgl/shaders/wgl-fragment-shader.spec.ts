import { TestBed, inject } from '@angular/core/testing';
import { WglFragmentShader } from './wgl-fragment-shader';

describe(WglFragmentShader.name, () => {

    let gl: WebGLRenderingContext;
    let shader: WglFragmentShader;

    beforeEach(() => {
        gl = document.createElement('canvas').getContext('webgl');
        shader = new WglFragmentShader(gl);
    });

    it('should be created', () => {
        expect(shader).toBeTruthy();
        expect(shader.globalScope).toBeTruthy();
    });

    describe('parse', () => {

        it('should parse an empty shader with a main', () => {
            shader.globalScope.createFunction('main', [], {acceptVisitor: (v) => 0, parse: () => 'void'});
            const regex = /^\s*void\s+main\s*\((void)?\s*\)\s+{\n\s*}\s*$/;
            expect(shader.parse()).toMatch(regex);
        });

        it('should throw an error when there is no main', () => {
            expect(() => shader.parse()).toThrow();
        });

    });

});
