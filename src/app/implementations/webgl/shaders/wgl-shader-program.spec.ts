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

    it('should not be created when one of its shaders does not parse', () => {
        const vShaderNoParse = new WglTestingVertexShaderNoParse();
        const fShaderNoParse = new WglTestingFragmentShaderNoParse();
        expect(() => new WglShaderProgram(gl, vShaderNoParse, fragmentShader)).toThrow();
        expect(() => new WglShaderProgram(gl, vertexShader  , fShaderNoParse)).toThrow();
        expect(() => new WglShaderProgram(gl, vShaderNoParse, fShaderNoParse)).toThrow();
    });

});
