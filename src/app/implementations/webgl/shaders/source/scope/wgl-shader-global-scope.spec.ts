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

describe(WglShaderGlobalScope.name, () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                WglShaderGlobalScope
            ]
        });
    });

    let scope: WglShaderGlobalScope;

    beforeEach(inject([WglShaderGlobalScope], (injScope: WglShaderGlobalScope) => {
        scope = injScope;
    }));

    it('should be created', () => {
        expect(scope).toBeTruthy();
        expect(scope.functions).toBeTruthy();
        expect(scope.inputs).toBeTruthy();
        expect(scope.outputs).toBeTruthy();
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
                'main', [], {acceptVisitor: (v => 0), parse: () => 'void'} // TODO Create and use a real void type
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

    describe('createInput', () => {

        it('should be able to create inputs', () => {
            const type = new WglShaderIntegerType();

            const initialNumberOfInputs = scope.inputs.size;
            const inp1 = scope.createInput('inp1', type);
            expect(inp1).toBeTruthy();
            expect(inp1.name).toEqual('inp1');
            expect(inp1.type).toBe(type);
            expect(scope.inputs.size).toEqual(initialNumberOfInputs + 1);
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

            const funcSignatureNewMethod = new WglShaderFunctionSignature([], new WglShaderMatrixType(2, 3));
            namesToTest.forEach(name => {
                expect(() => scope.createInput(name, funcSignatureNewMethod)).toThrow();
            });
        });

    });

    describe('createOutput', () => {

        it('should be able to create outputs', () => {
            const type = new WglShaderIntegerType();

            const initialNumberOfOutputs = scope.outputs.size;
            const out1 = scope.createOutput('out1', type);
            expect(out1).toBeTruthy();
            expect(out1.name).toEqual('out1');
            expect(out1.type).toBe(type);
            expect(scope.outputs.size).toEqual(initialNumberOfOutputs + 1);
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

            const funcSignatureNewMethod = new WglShaderFunctionSignature([], new WglShaderMatrixType(2, 3));
            namesToTest.forEach(name => {
                expect(() => scope.createOutput(name, funcSignatureNewMethod)).toThrow();
            });
        });

    });

});
