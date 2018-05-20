import { TestBed, inject } from '@angular/core/testing';
import { WglShaderGlobalScope } from './wgl-shader-global-scope';
import { WglShaderFunction } from './local-scopes/wgl-shader-function';
import { WglShaderVariable } from '../expression/lvalues/wgl-shader-variable';
import { WglShaderIntegerType } from '../expression/types/wgl-shader-integer-type';
import { WglShaderFunctionSignature } from '../expression/types/wgl-shader-function-signature';
import { WglShaderInput } from '../expression/lvalues/wgl-shader-input';
import { WglShaderMatrixType } from '../expression/types/wgl-shader-matrix-type';
import { WglShaderOutput } from '../expression/lvalues/wgl-shader-output';
import { WglShaderTestingUtil } from '../../testing/wgl-shader-testing-util';
import { WglShaderVoidType } from '../expression/types/wgl-shader-void-type';
import { Shader } from '../../../../../api/shaders/shader';
import { WglTestingVertexShaderValid } from '../../testing/shaders/wgl-testing-vertex-shader-valid';
import { WglShaderVertexShaderGlobalScope } from './global-scopes/wgl-shader-vertex-shader-global-scope';

describe(WglShaderGlobalScope.name, () => {

    let parentShader: Shader;
    let scope: WglShaderGlobalScope;

    beforeEach(() => {
        parentShader = new WglTestingVertexShaderValid();
        scope = new WglShaderVertexShaderGlobalScope(parentShader);
    });

    it('should be created', () => {
        expect(scope).toBeTruthy();
        expect(scope.functions).toBeTruthy();
        expect(scope.inputs).toBeTruthy();
        expect(scope.outputs).toBeTruthy();
        expect(scope.parent).toBe(parentShader);
    });

    describe('parse', () => {

        it('should parse all global symbols', () => {
            const inp1 = scope.createInput('inp1', new WglShaderIntegerType());
            const outp1 = scope.createOutput('outp1', new WglShaderIntegerType());
            const func1 = scope.createFunction(
                'foo',
                [
                    new WglShaderVariable('p1', new WglShaderIntegerType()),
                    new WglShaderVariable('p2', new WglShaderIntegerType())
                ],
                new WglShaderIntegerType()
            );
            const main = scope.createFunction(
                'main', [], new WglShaderVoidType()
            );
            const inp1Regex  = WglShaderTestingUtil.escapeRegexCharacters(inp1 .parse());
            const outp1Regex = WglShaderTestingUtil.escapeRegexCharacters(outp1.parse());
            const func1Regex = WglShaderTestingUtil.escapeRegexCharacters(func1.parse());
            const mainRegex  = WglShaderTestingUtil.escapeRegexCharacters(main .parse());

            const regex = new RegExp(`\\s*${inp1Regex}\\n\\s*${outp1Regex}\\n\\s*${func1Regex}\\n\\s${mainRegex}`);
            expect(scope.parse()).toMatch(regex);
        });

        it('should throw an error when there is no defined main', () => {
            expect(() => scope.parse()).toThrowError(/main/);
        });

    });

    describe('createFunction', () => {

        it('should be able to create functions', () => {
            const param1 = new WglShaderVariable('p0', new WglShaderIntegerType);
            const param2 = new WglShaderVariable('p1', new WglShaderIntegerType);
            const ret = new WglShaderIntegerType();
            const params0: WglShaderVariable[] = [];
            const params1 = [param1];
            const params2 = [param1, param2];

            const initialNumberOfFunctions = scope.functions.size;

            scope.createFunction('testFunc0', params0, ret);
            scope.createFunction('testFunc1', params1, ret);
            scope.createFunction('testFunc2', params2, ret);

            expect(scope.functions.size).toEqual(initialNumberOfFunctions + 3);
            const f0 = scope.functions.get('testFunc0');
            const f1 = scope.functions.get('testFunc1');
            const f2 = scope.functions.get('testFunc2');
            expect(f0).toBeTruthy();
            const expectedSignature0 = new WglShaderFunctionSignature(params0.map(param => param.type), ret);
            expect(f0.signature).toEqual(expectedSignature0);
            expect(f1).toBeTruthy();
            const expectedSignature1 = new WglShaderFunctionSignature(params1.map(param => param.type), ret);
            expect(f1.signature).toEqual(expectedSignature1, ret);
            expect(f2).toBeTruthy();
            const expectedSignature2 = new WglShaderFunctionSignature(params2.map(param => param.type), ret);
            expect(f2.signature).toEqual(expectedSignature2, ret);
        });

        it('should throw an error if another global symbol of such name exists', () => {
            const params = [];
            const ret = new WglShaderIntegerType();
            scope.createFunction('testFunc1', params, ret);
            scope.createInput('testInput1', new WglShaderIntegerType());
            scope.createOutput('testOutput1', new WglShaderIntegerType());

            const namesToTest = [
                'testFunc1',
                'testInput1',
                'testOutput1'
            ];


            const paramsNewMethod = [];
            const retNewMethod = new WglShaderIntegerType();
            namesToTest.forEach(name => {
                expect(() => scope.createFunction(name, paramsNewMethod, retNewMethod)).toThrow();
            });
        });

    });

});
