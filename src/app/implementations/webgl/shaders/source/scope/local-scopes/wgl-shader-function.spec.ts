import { TestBed, inject } from '@angular/core/testing';
import { WglShaderFunction } from './wgl-shader-function';
import { WglShaderFunctionSignature } from '../../expression/types/wgl-shader-function-signature';
import { WglShaderFloatType } from '../../expression/types/wgl-shader-float-type';
import { WglShaderIntegerType } from '../../expression/types/wgl-shader-integer-type';
import { WglShaderTestingUtil } from '../../../testing/wgl-shader-testing-util';
import { WglShaderVariable } from '../../expression/lvalues/wgl-shader-variable';
import { WglShaderArgumentListParser } from '../util/wgl-shader-argument-list-parser';

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
            const testCases: WglShaderVariable[][] = [
                [],
                [new WglShaderVariable('v10', new WglShaderIntegerType())],
                [new WglShaderVariable('v20', new WglShaderIntegerType()), new WglShaderVariable('v21', new WglShaderIntegerType())]
            ];
            testCases.forEach((tc) => {
                const parser = new WglShaderArgumentListParser();
                const parsedArgList = WglShaderTestingUtil.escapeRegexCharacters(parser.parseDeclaration(tc));
                expect(func.parse()).toMatch(new RegExp(
                    '^' + func.signature.return.parse() + '\\s+' + func.name + '\\s*' + parsedArgList + '\\s+\\{\\n+\\}$'
                ));
            });
        });

    });

});
