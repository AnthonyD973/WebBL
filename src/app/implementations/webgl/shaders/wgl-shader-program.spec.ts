import { TestBed, inject } from '@angular/core/testing';
import { WglShaderProgram } from './wgl-shader-program';
import { WglTestingVertexShaderNoParse } from './testing/shaders/wgl-testing-vertex-shader-no-parse';
import { FragmentShader } from '../../../api/shaders/fragment-shader';
import { VertexShader } from '../../../api/shaders/vertex-shader';
import { WglVertexShader } from './wgl-vertex-shader';
import { WglFragmentShader } from './wgl-fragment-shader';
import { WglTestingFragmentShaderNoParse } from './testing/shaders/wgl-testing-fragment-shader-no-parse';

describe(WglShaderProgram.name, () => {

    let vertexShader: VertexShader;
    let fragmentShader: FragmentShader;
    let program: WglShaderProgram;

    beforeEach(() => {
        vertexShader = new WglVertexShader();
        vertexShader.globalScope.createFunction('main', [], {acceptVisitor: (v) => 0, parse: () => 'void'});
        fragmentShader = new WglFragmentShader();
        fragmentShader.globalScope.createFunction('main', [], {acceptVisitor: (v) => 0, parse: () => 'void'});
        program = new WglShaderProgram(vertexShader, fragmentShader);
    });

    it('should be created', () => {
        expect(program).toBeTruthy();
        expect(program.vertexShader).toBe(vertexShader);
        expect(program.fragmentShader).toBe(fragmentShader);
    });

    it('should not be created when one of its shaders does not parse', () => {
        const vShaderNoParse = new WglTestingVertexShaderNoParse();
        const fShaderNoParse = new WglTestingFragmentShaderNoParse();
        expect(() => new WglShaderProgram(vShaderNoParse, fragmentShader)).toThrow();
        expect(() => new WglShaderProgram(vertexShader  , fShaderNoParse)).toThrow();
        expect(() => new WglShaderProgram(vShaderNoParse, fShaderNoParse)).toThrow();
    });

});
