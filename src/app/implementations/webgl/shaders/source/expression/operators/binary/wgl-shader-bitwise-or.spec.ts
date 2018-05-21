import { ShaderExpression } from '../../../../../../../api/shaders/source/expression/shader-expression';
import { WglShaderVariable } from '../../lvalues/wgl-shader-variable';
import { WglShaderBitwiseOr } from './wgl-shader-bitwise-or';
import { WglShaderLiteralSamples } from '../../../../testing/wgl-shader-literal-samples';
import { ShaderExpressionType } from '../../../../../../../api/shaders/source/expression/shader-expression-type';
import { WglShaderTestingUtil } from '../../../../testing/wgl-shader-testing-util';
import { WglShaderBooleanType } from '../../types/wgl-shader-boolean-type';

describe(WglShaderBitwiseOr.name, () => {

    let s: WglShaderLiteralSamples;

    beforeEach(() => {
        s = new WglShaderLiteralSamples();
    });

    it('should be created', () => {
        const bTrueLeft = s.bTrue;
        const bTrueRight = s.bTrue;
        const operation = new WglShaderBitwiseOr(bTrueLeft, bTrueRight);
        expect(operation).toBeTruthy();
        expect(operation.lhs).toBe(bTrueLeft);
        expect(operation.rhs).toBe(bTrueRight);
        expect(operation.type).toEqual(new WglShaderBooleanType());
    });

    it('should not be created with invalid types', () => {
        const testCases = [
            {lhs: s.bTrue, rhs: s.m23},
            {lhs: s.bTrue, rhs: s.v2},

            {lhs: s.fPi, rhs: s.m23},
            {lhs: s.fPi, rhs: s.v2},

            {lhs: s.iNeg, rhs: s.m23},
            {lhs: s.iNeg, rhs: s.v2},

            {lhs: s.m23,  rhs: s.bTrue},
            {lhs: s.m23,  rhs: s.fPi},
            {lhs: s.m32,  rhs: s.iNeg},
            {lhs: s.m32,  rhs: s.m3},
            {lhs: s.m3,   rhs: s.v3},

            {lhs: s.v2, rhs: s.bTrue},
            {lhs: s.v2, rhs: s.fPi},
            {lhs: s.v3, rhs: s.iNeg},
            {lhs: s.v2, rhs: s.m3},
            {lhs: s.v4, rhs: s.v3},
        ];

        testCases.forEach((testCase, index) => {
            expect(() => new WglShaderBitwiseOr(testCase.lhs, testCase.rhs)).toThrow();
        });
    });

    describe('parse', () => {

        it('should produce valid results with valid types', () => {
            const testCases = [
                {lhs: s.bTrue, rhs: s.bTrue},
                {lhs: s.bTrue, rhs: s.fPi},
                {lhs: s.bTrue, rhs: s.iNeg},

                {lhs: s.fPi, rhs: s.bTrue},
                {lhs: s.fPi, rhs: s.fPi},
                {lhs: s.fPi, rhs: s.iNeg},

                {lhs: s.iNeg, rhs: s.bTrue},
                {lhs: s.iNeg, rhs: s.fPi},
                {lhs: s.iNeg, rhs: s.iNeg},
            ];

            testCases.forEach((testCase, index) => {
                const operation = new WglShaderBitwiseOr(testCase.lhs, testCase.rhs);
                const lhsRegex = WglShaderTestingUtil.escapeRegexCharacters(testCase.lhs.parse());
                const rhsRegex = WglShaderTestingUtil.escapeRegexCharacters(testCase.rhs.parse());
                expect(
                    operation.parse()).toMatch(new RegExp('^' + lhsRegex + '\\s*\\|\\s*' + rhsRegex + '$'),
                    'Error at test case #' + index
                );
            });
        });

    });

});
