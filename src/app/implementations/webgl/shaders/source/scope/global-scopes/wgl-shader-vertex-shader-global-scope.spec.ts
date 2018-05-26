import { WglShaderVertexShaderGlobalScope } from './wgl-shader-vertex-shader-global-scope';
import { WglVertexShader } from '../../../wgl-vertex-shader';
import { WglTestingVertexShaderValid } from '../../../testing/shaders/wgl-testing-vertex-shader-valid';
import { WglShaderAttribute } from '../../expression/lvalues/wgl-shader-attribute';
import { WglShaderIntegerType } from '../../expression/types/wgl-shader-integer-type';
import { WglShaderVaryingOutputSide } from '../../expression/lvalues/wgl-shader-varying-output-side';
import { WglShaderFunctionSignature } from '../../expression/types/wgl-shader-function-signature';
import { WglShaderLValueDeclarationParser } from '../../expression/lvalues/lvalue-parsers/wgl-shader-l-value-declaration-parser';

describe(WglShaderVertexShaderGlobalScope.name, () => {

    let shader: WglVertexShader;
    let scope: WglShaderVertexShaderGlobalScope;

    beforeEach(() => {
        shader = new WglTestingVertexShaderValid();
        scope = new WglShaderVertexShaderGlobalScope(shader);
    });

    it('should be created', () => {
        expect(scope).toBeTruthy();
        expect(scope.parent).toBe(shader);
    });

    describe('createInput', () => {

        it('should return something that behaves like an attribute', () => {
            const refAttrib = new WglShaderAttribute('xSpeed', new WglShaderIntegerType());
            const attrib = scope.createInput('xSpeed', new WglShaderIntegerType());

            expect(attrib.name).toEqual(refAttrib.name);
            expect(attrib.type).toEqual(refAttrib.type);
            expect(new WglShaderLValueDeclarationParser(attrib).parse()).toEqual(new WglShaderLValueDeclarationParser(refAttrib).parse());
            expect(attrib.isReadable()).toEqual(refAttrib.isReadable());
            expect(attrib.isWritable()).toEqual(refAttrib.isWritable());
        });

        it('should throw an error if another global symbol of such name exists', () => {
            const params = [];
            const ret = new WglShaderIntegerType();
            scope.createFunction('testFunc1', params, ret);
            scope.createUniform('testUniform1', new WglShaderIntegerType());
            scope.createInput('testInput1', new WglShaderIntegerType());
            scope.createOutput('testOutput1', new WglShaderIntegerType());

            const namesToTest = [
                'testFunc1',
                'testUniform1',
                'testInput1',
                'testOutput1'
            ];

            const funcSignatureNewMethod = new WglShaderFunctionSignature([], new WglShaderIntegerType());
            namesToTest.forEach(name => {
                expect(() => scope.createInput(name, funcSignatureNewMethod)).toThrow();
            });
        });

    });

    describe('createOutput', () => {

        it('should return something that behaves like a varying', () => {
            const refVarying = new WglShaderVaryingOutputSide('rColor', new WglShaderIntegerType());
            const varying = scope.createOutput('rColor', new WglShaderIntegerType());

            expect(varying.name).toEqual(refVarying.name);
            expect(varying.type).toEqual(refVarying.type);
            expect(new WglShaderLValueDeclarationParser(varying).parse()).toEqual(new WglShaderLValueDeclarationParser(refVarying).parse());
            expect(varying.isReadable()).toEqual(refVarying.isReadable());
            expect(varying.isWritable()).toEqual(refVarying.isWritable());
        });

        it('should throw an error if another global symbol of such name exists', () => {
            const params = [];
            const ret = new WglShaderIntegerType();
            scope.createFunction('testFunc1', params, ret);
            scope.createUniform('testUniform1', new WglShaderIntegerType());
            scope.createInput('testInput1', new WglShaderIntegerType());
            scope.createOutput('testOutput1', new WglShaderIntegerType());

            const namesToTest = [
                'testFunc1',
                'testUniform1',
                'testInput1',
                'testOutput1'
            ];

            const funcSignatureNewMethod = new WglShaderFunctionSignature([], new WglShaderIntegerType());
            namesToTest.forEach(name => {
                expect(() => scope.createInput(name, funcSignatureNewMethod)).toThrow();
            });
        });

    });

});
