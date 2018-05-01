import { WglShaderFunctionSignature } from './wgl-shader-function-signature';
import { WglShaderIntegerType } from './wgl-shader-integer-type';
import { WglShaderTestingUtil } from '../../../testing/wgl-shader-testing-util';
import { ShaderExpressionType } from '../../../../../../api/shaders/source/expression/shader-expression-type';
import { WglShaderLiteralSamples } from '../../../testing/wgl-shader-literal-samples';
import { WglShaderExpressionTypeVisitor } from './wgl-shader-expression-type-visitor';

describe(WglShaderFunctionSignature.name, () => {

    let t0: WglShaderFunctionSignature;
    let t1: WglShaderFunctionSignature;
    let t2: WglShaderFunctionSignature;
    let ret: ShaderExpressionType;
    let p0: ShaderExpressionType;
    let p1: ShaderExpressionType;
    let s: WglShaderLiteralSamples;

    beforeEach(() => {
        ret = new WglShaderIntegerType();
        p0  = new WglShaderIntegerType();
        p1  = new WglShaderIntegerType();

        t0  = new WglShaderFunctionSignature([],       ret);
        t1  = new WglShaderFunctionSignature([p0],     ret);
        t2  = new WglShaderFunctionSignature([p0, p1], ret);

        s = new WglShaderLiteralSamples();
    });

    it('should be created', () => {
        expect(t0).toBeTruthy();
        expect(t1).toBeTruthy();
        expect(t2).toBeTruthy();
    });

    describe('parse', () => {

        it('should work correctly', () => {
            const retRegex = WglShaderTestingUtil.escapeRegexCharacters(ret.parse());
            const p0Regex  = WglShaderTestingUtil.escapeRegexCharacters(p0.parse());
            const p1Regex  = WglShaderTestingUtil.escapeRegexCharacters(p1.parse());
            expect(t0.parse()).toMatch(new RegExp('^' + retRegex + '\\s*\\(\\s*\\)' + '$'));
            expect(t1.parse()).toMatch(new RegExp('^' + retRegex + '\\s*\\(\\s*' + p0Regex + '\\s*\\)' + '$'));
            expect(t2.parse()).toMatch(new RegExp('^' + retRegex + '\\s*\\(\\s*' + p0Regex + '\\s*,\\s*' + p1Regex + '\\s*\\)' + '$'));
        });

    });

    describe('acceptVisitor', () => {

        it('should behave the same as the return type', () => {
            const testCases: ShaderExpressionType[] = [
                s.bTrue.type,
                s.fPi.type,
                s.iNeg.type,
                s.m3.type,
                s.v2.type
            ];
            testCases.forEach((tc, index) => {
                const v = new WglShaderExpressionTypeVisitor();
                const t = new WglShaderFunctionSignature([], tc);
                expect(t.acceptVisitor(v)).toEqual(tc.acceptVisitor(v));
            });
        });

    });

});
