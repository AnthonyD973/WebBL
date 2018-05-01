import { TestBed, inject } from '@angular/core/testing';
import { WglShaderFunction } from './wgl-shader-function';
import { WglShaderFunctionSignature } from '../../expression/types/wgl-shader-function-signature';
import { WglShaderFloatType } from '../../expression/types/wgl-shader-float-type';
import { WglShaderIntegerType } from '../../expression/types/wgl-shader-integer-type';
import { WglShaderTestingUtil } from '../../../testing/wgl-shader-testing-util';

describe(WglShaderFunction.name, () => {
    let func: WglShaderFunction;
    let signature: WglShaderFunctionSignature;

    beforeEach(() => {
        signature = new WglShaderFunctionSignature([new WglShaderIntegerType(), new WglShaderIntegerType()], new WglShaderIntegerType());
        func = new WglShaderFunction(
            'testFunc',
            signature
        );
    });

    it('should be created with a valid identifier', () => {
        const testCases: string[] = [
            'testFunc', 'testFunc8', '_', 'main', '_8'
        ];
        testCases.forEach((tc, index) => {
            const tcFunc = new WglShaderFunction(tc, signature);
            expect(tcFunc).toBeTruthy();
            expect(tcFunc.name).toEqual(tc);
            expect(tcFunc.scopeName).toBeTruthy();
            expect(tcFunc.signature).toBe(signature);
        });
    });

    it('should not be created if the identifier is invalid', () => {
        const testCases: string[] = [
            '_*', '*a', '8_', 'asdf*asdf'
        ];
        testCases.forEach((tc, index) => {
            expect(() => new WglShaderFunction(tc, signature)).toThrow();
        });
    });

    describe('parse', () => {

        it('should parse an empty function', () => {
            const p0Regex = WglShaderTestingUtil.escapeRegexCharacters(signature.params[0].parse());
            const p1Regex = WglShaderTestingUtil.escapeRegexCharacters(signature.params[1].parse());
            expect(func.parse()).toMatch(new RegExp(
                '^' + func.name + '\\s*\\(\\s*' + p0Regex + '\\s*,\\s*' +
                p1Regex + '\\s*\\)\\s+\\{\\n+\\}$'
            ));
        });

    });

});
