import { TestBed, inject } from '@angular/core/testing';
import { WglShaderGlobalScope } from './wgl-shader-global-scope';
import { WglShaderFunction } from './local-scopes/wgl-shader-function';
import { WglShaderVariable } from '../expression/lvalues/wgl-shader-variable';
import { WglShaderIntegerType } from '../expression/types/wgl-shader-integer-type';
import { WglShaderFunctionSignature } from '../expression/types/wgl-shader-function-signature';
import { WglShaderInput } from '../expression/lvalues/wgl-shader-input';
import { WglShaderMatrixType } from '../expression/types/wgl-shader-matrix-type';

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

    describe('createFunction', () => {

        it('should be able to create functions', () => {
            const param1 = new WglShaderVariable('p0', new WglShaderIntegerType);
            const param2 = new WglShaderVariable('p1', new WglShaderIntegerType);
            const ret = new WglShaderIntegerType();
            const sig0 = new WglShaderFunctionSignature([], ret);
            const sig1 = new WglShaderFunctionSignature([], ret);
            const sig2 = new WglShaderFunctionSignature([], ret);

            const initialNumberOfFunctions = scope.functions.size;

            scope.createFunction('testFunc0', sig0);
            scope.createFunction('testFunc1', sig1);
            scope.createFunction('testFunc2', sig2);

            expect(scope.functions.size).toEqual(initialNumberOfFunctions + 3);
            const f0 = scope.functions.get('testFunc0');
            const f1 = scope.functions.get('testFunc1');
            const f2 = scope.functions.get('testFunc2');
            expect(f0).toBeTruthy();
            expect(f0.signature).toEqual(sig0);
            expect(f1).toBeTruthy();
            expect(f1.signature).toEqual(sig1);
            expect(f2).toBeTruthy();
            expect(f2.signature).toEqual(sig2);
        });

        it('should throw an error if another global symbol of such name exists', () => {
            const funcSignature = new WglShaderFunctionSignature([], new WglShaderIntegerType());
            scope.createFunction('testFunc1', funcSignature);
            scope.createInput('testInput1', new WglShaderIntegerType());
            scope.createOutput('testOutput1', new WglShaderIntegerType());

            const namesToTest = [
                'testFunc1',
                'testInput1',
                'testOutput1'
            ];

            const funcSignatureNewMethod = new WglShaderFunctionSignature([], new WglShaderMatrixType(2, 3));
            namesToTest.forEach(name => {
                expect(() => scope.createFunction(name, funcSignatureNewMethod)).toThrow();
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
            const funcSignature = new WglShaderFunctionSignature([], new WglShaderIntegerType());
            scope.createFunction('testFunc1', funcSignature);
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
            const funcSignature = new WglShaderFunctionSignature([], new WglShaderIntegerType());
            scope.createFunction('testFunc1', funcSignature);
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
