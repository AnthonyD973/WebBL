import { TestBed, inject } from '@angular/core/testing';
import { WglShaderArgumentListParser } from './wgl-shader-argument-list-parser';
import { ShaderExpressionType } from '../../../../../../api/shaders/source/expression/shader-expression-type';
import { WglShaderIntegerType } from '../../expression/types/wgl-shader-integer-type';
import { WglShaderVariable } from '../../expression/lvalues/wgl-shader-variable';
import { ShaderExpression } from '../../../../../../api/shaders/source/expression/shader-expression';
import { WglShaderIntegerLiteral } from '../../expression/rvalues/wgl-shader-integer-literal';

describe(WglShaderArgumentListParser.name, () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                WglShaderArgumentListParser
            ]
        });
    });

    let parser: WglShaderArgumentListParser;
    const parsedType = new WglShaderIntegerType().parse();

    beforeEach(inject([WglShaderArgumentListParser], (injParser: WglShaderArgumentListParser) => {
        parser = injParser;
    }));

    it('should be created', () => {
        expect(parser).toBeTruthy();
    });

    describe('parseSignature', () => {
        it('should produce a parsed argument list of the types', () => {
            const testCases: {params: ShaderExpressionType[], expected: string}[] = [
                {params: [], expected: '^\\(\\s*\\)$'},
                {params: [new WglShaderIntegerType()], expected: '^\\(\\s*' + parsedType + '\\s*\\)$' },
                {
                    params: [new WglShaderIntegerType(), new WglShaderIntegerType()],
                    expected: '^\\(\\s*' + parsedType + '\\s*,\\s*' + parsedType + '\\s*\\)$'
                }
            ];
            testCases.forEach((tc, index) => {
                const result = parser.parseSignature(tc.params);
                expect(result).toMatch(new RegExp(tc.expected));
            });
        });

    });

    describe('parseDeclaration', () => {

        it('should produce a parsed argument list of the variables\' name and type', () => {
            const testCases: {params: WglShaderVariable[], expected: string}[] = [
                {params: [], expected: '^\\(\\s*\\)$'},
                {
                    params: [new WglShaderVariable('foo', new WglShaderIntegerType())],
                    expected: '^\\(\\s*' + parsedType + '\\s+foo\\s*\\)$'
                },
                {
                    params: [
                        new WglShaderVariable('foo', new WglShaderIntegerType()),
                        new WglShaderVariable('bar', new WglShaderIntegerType())
                    ],
                    expected: '^\\(\\s*' + parsedType + '\\s+foo\\s*,\\s*' + parsedType + '\\s+bar\\s*\\)$'
                }
            ];
            testCases.forEach((tc, index) => {
                const result = parser.parseDeclaration(tc.params);
                expect(result).toMatch(new RegExp(tc.expected));
            });
        });

    });

    describe('parseFunctionCall', () => {

        it('should produce a parsed argument list of a function call', () => {
            const testCases: {params: ShaderExpression[], expected: string}[] = [
                {params: [], expected: '^\\(\\s*\\)$'},
                {params: [new WglShaderIntegerLiteral(0)], expected: '^\\(\\s*0\\s*\\)$' },
                {
                    params: [new WglShaderIntegerLiteral(0), new WglShaderIntegerLiteral(0)],
                    expected: '^\\(\\s*0\\s*,\\s*0\\s*\\)$'
                }
            ];
            testCases.forEach((tc, index) => {
                const result = parser.parseFunctionCall(tc.params);
                expect(result).toMatch(new RegExp(tc.expected));
            });
        });

    });

});
