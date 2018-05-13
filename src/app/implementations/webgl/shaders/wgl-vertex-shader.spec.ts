import { TestBed, inject } from '@angular/core/testing';
import { WglVertexShader } from './wgl-vertex-shader';
import { WglShaderVoidType } from './source/expression/types/wgl-shader-void-type';

describe(WglVertexShader.name, () => {

    let gl: WebGLRenderingContext;
    let shader: WglVertexShader;

    beforeEach(() => {
        gl = document.createElement('canvas').getContext('webgl');
        shader = new WglVertexShader(gl);
    });

    it('should be created', () => {
        expect(shader).toBeTruthy();
        expect(shader.globalScope).toBeTruthy();
    });

    describe('parse', () => {

        it('should parse an empty shader with a main', () => {
            shader.globalScope.createFunction('main', [], new WglShaderVoidType());
            const regex = /^\s*void\s+main\s*\((void)?\s*\)\s+{\n\s*}\s*$/;
            expect(shader.parse()).toMatch(regex);
        });

        it('should throw an error when there is no main', () => {
            expect(() => shader.parse()).toThrow();
        });

    });

});
