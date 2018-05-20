import { TestBed, inject } from '@angular/core/testing';
import { WglShaderFunction } from './wgl-shader-function';
import { WglShaderFunctionSignature } from '../../expression/types/wgl-shader-function-signature';
import { WglShaderFloatType } from '../../expression/types/wgl-shader-float-type';
import { WglShaderIntegerType } from '../../expression/types/wgl-shader-integer-type';
import { WglShaderTestingUtil } from '../../../testing/wgl-shader-testing-util';
import { WglShaderVariable } from '../../expression/lvalues/wgl-shader-variable';
import { WglShaderArgumentListParser } from '../util/wgl-shader-argument-list-parser';
import { ShaderExpressionType } from '../../../../../../api/shaders/source/expression/shader-expression-type';
import { WglShaderBlock } from '../../statement/wgl-shader-block';

describe(WglShaderFunction.name, () => {

    let signature: WglShaderFunctionSignature;
    let variables: WglShaderVariable[];
    let ret: ShaderExpressionType;

    beforeEach(() => {
        signature = new WglShaderFunctionSignature([new WglShaderIntegerType(), new WglShaderIntegerType()], new WglShaderIntegerType());
        variables = [new WglShaderVariable('v0', new WglShaderIntegerType()), new WglShaderVariable('v1', new WglShaderIntegerType())];
        ret = new WglShaderIntegerType();
    });

    it('should be created with a valid identifier', () => {
        const testCases: string[] = [
            'testFunc', 'testFunc8', '_', 'main', '_8'
        ];
        testCases.forEach((tc, index) => {
            const tcFunc = new WglShaderFunction(tc, variables, ret);
            expect(tcFunc).toBeTruthy();
            expect(tcFunc.name).toEqual(tc);
            expect(tcFunc.scopeName).toBeTruthy();
            expect(tcFunc.codeBlock).toBeTruthy();
        });
    });

    it('should not be created if the identifier is invalid', () => {
        const testCases: string[] = [
            '_*', '*a', '8_', 'asdf*asdf'
        ];
        testCases.forEach((tc, index) => {
            expect(() => new WglShaderFunction(tc, variables, ret)).toThrow();
        });
    });

    describe('signature', () => {

        it('should reflect the function\'s parameters', () => {
            const func = new WglShaderFunction('func', variables, ret);
            expect(func.signature).toEqual(signature);
        });

    });

    describe('parse', () => {

        it('should parse an empty function', () => {
            const testCases: WglShaderVariable[][] = [
                [],
                variables.slice(0, 1),
                variables.slice(0, 2)
            ];
            testCases.forEach((tc) => {
                const parser = new WglShaderArgumentListParser();
                const parsedArgList = WglShaderTestingUtil.escapeRegexCharacters(parser.parseDeclaration(tc));
                const func = new WglShaderFunction('func', tc, ret);
                expect(func.parse()).toMatch(new RegExp(
                    '^' + func.signature.return.parse() + '\\s+' + func.name + '\\s*' + parsedArgList + '\\s+\\{\\n+\\}$'
                ));
            });
        });

    });

    describe('addChild', () => {

        it('should throw an error', () => {
            expect(() => {
                new WglShaderFunction('foo', [], new WglShaderIntegerType())
                    .addChild(new WglShaderBlock());
            }).toThrow();
        });

    });

});
