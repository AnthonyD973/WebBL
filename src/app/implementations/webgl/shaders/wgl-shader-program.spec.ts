import { TestBed, inject } from '@angular/core/testing';
import { WglShaderProgram } from './wgl-shader-program';
import { WglTestingVertexShaderNoParse } from './testing/shaders/wgl-testing-vertex-shader-no-parse';
import { WglVertexShader } from './wgl-vertex-shader';
import { WglFragmentShader } from './wgl-fragment-shader';
import { WglTestingFragmentShaderNoParse } from './testing/shaders/wgl-testing-fragment-shader-no-parse';
import { WglTestingVertexShaderValid } from './testing/shaders/wgl-testing-vertex-shader-valid';
import { WglTestingFragmentShaderValid } from './testing/shaders/wgl-testing-fragment-shader-valid';
import { WglShaderVoidType } from './source/expression/types/wgl-shader-void-type';

describe(WglShaderProgram.name, () => {

    let gl: WebGLRenderingContext;
    let vertexShader: WglVertexShader;
    let fragmentShader: WglFragmentShader;
    let program: WglShaderProgram;

    let programWithRealShaders: WglShaderProgram;

    beforeEach(() => {
        gl = document.createElement('canvas').getContext('webgl');
        vertexShader = new WglTestingVertexShaderValid();
        fragmentShader = new WglTestingFragmentShaderValid();
        program = new WglShaderProgram(gl, vertexShader, fragmentShader);

        const vs = new WglVertexShader(gl);
        vs.globalScope.createFunction('main', [], new WglShaderVoidType());
        const fs = new WglFragmentShader(gl);
        fs.globalScope.createFunction('main', [], new WglShaderVoidType());
        programWithRealShaders = new WglShaderProgram(gl, vs, fs);
    });

    it('should be created', () => {
        expect(program).toBeTruthy();
        expect(program.vertexShader).toBe(vertexShader);
        expect(program.fragmentShader).toBe(fragmentShader);
    });

    describe('end', () => {

        it('should not throw an error when its shaders compile', () => {
            programWithRealShaders.end();
        });

        it('should throw an error when it is called more than once', () => {
            programWithRealShaders.end();
            for (let i = 0; i < 3; ++i) {
                expect(() => programWithRealShaders.end()).toThrow();
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
                expect(() => prgm.end()).toThrow();
            });
        });

    });

});
