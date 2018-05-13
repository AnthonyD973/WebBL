import { TestBed, inject } from '@angular/core/testing';
import { WglShaderProgram } from './wgl-shader-program';
import { WglTestingVertexShaderNoParse } from './testing/shaders/wgl-testing-vertex-shader-no-parse';
import { FragmentShader } from '../../../api/shaders/fragment-shader';
import { VertexShader } from '../../../api/shaders/vertex-shader';
import { WglTestingFragmentShaderNoParse } from './testing/shaders/wgl-testing-fragment-shader-no-parse';
import { WglTestingVertexShaderValid } from './testing/shaders/wgl-testing-vertex-shader-valid';
import { WglTestingFragmentShaderValid } from './testing/shaders/wgl-testing-fragment-shader-valid';

describe(WglShaderProgram.name, () => {

    let gl: WebGLRenderingContext;
    let vertexShader: VertexShader;
    let fragmentShader: FragmentShader;
    let program: WglShaderProgram;

    beforeEach(() => {
        gl = document.createElement('canvas').getContext('webgl');
        vertexShader = new WglTestingVertexShaderValid();
        fragmentShader = new WglTestingFragmentShaderValid();
        program = new WglShaderProgram(gl, vertexShader, fragmentShader);
    });

    it('should be created', () => {
        expect(program).toBeTruthy();
        expect(program.vertexShader).toBe(vertexShader);
        expect(program.fragmentShader).toBe(fragmentShader);
    });

    describe('end', () => {

        it('should not throw an error when its shaders compile', () => {
            program.end();
        });

        it('should throw an error when it is called more than once', () => {
            program.end();
            for (let i = 0; i < 3; ++i) {
                expect(() => program.end()).toThrow();
            }
        });

        it('should throw an error when one of its shaders does not compile', () => {
            const vShaderNoParse = new WglTestingVertexShaderNoParse();
            const fShaderNoParse = new WglTestingFragmentShaderNoParse();
            const programs = [
                new WglShaderProgram(gl, vShaderNoParse, fragmentShader),
                new WglShaderProgram(gl, vertexShader  , fShaderNoParse),
                new WglShaderProgram(gl, vShaderNoParse, fShaderNoParse)
            ];

            programs.forEach(prgm => {
                expect(prgm.end()).toThrow();
            });
        });

    });

});
