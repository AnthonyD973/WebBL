import { ShaderExpression } from '../../../../../../../api/shaders/source/expression/shader-expression';
import { WglShaderVariable } from '../../lvalues/wgl-shader-variable';
import { WglShaderAssignment } from './wgl-shader-assignment';
import { WglShaderFloatLiteral } from '../../rvalues/wgl-shader-float-literal';
import { WglShaderFloatType } from '../../types/wgl-shader-float-type';
import { WglShaderLiteralSamples } from '../../../../testing/wgl-shader-literal-samples';
import { ShaderExpressionType } from '../../../../../../../api/shaders/source/expression/shader-expression-type';
import { WglShaderTestingUtil } from '../../../../testing/wgl-shader-testing-util';

describe(WglShaderAssignment.name, () => {

    let type: WglShaderFloatType;
    let expr: ShaderExpression;
    let variable: WglShaderVariable;
    let assignment: WglShaderAssignment;
    let s: WglShaderLiteralSamples;

    beforeEach(() => {
        type = new WglShaderFloatType();
        expr = new WglShaderFloatLiteral(3.14);
        variable = new WglShaderVariable('myVar', type);
        assignment = new WglShaderAssignment(variable, expr);
        s = new WglShaderLiteralSamples();
    });

    it('should be created', () => {
        expect(variable).toBeTruthy();
        expect(variable.name).toEqual('myVar');
        expect(variable.type).toEqual(new WglShaderFloatType());
    });

    describe('parse', () => {

        it('should produce valid results with valid types', () => {
            const testCases: {typeVar: ShaderExpressionType, expr: ShaderExpression}[] = [
                {typeVar: s.bTrue.type, expr: s.bTrue},
                {typeVar: s.bTrue.type, expr: s.fPi},
                {typeVar: s.bTrue.type, expr: s.iNeg},

                {typeVar: s.fPi.type,   expr: s.bTrue},
                {typeVar: s.fPi.type,   expr: s.fPi},
                {typeVar: s.fPi.type,   expr: s.iNeg},

                {typeVar: s.iNeg.type,  expr: s.bTrue},
                {typeVar: s.iNeg.type,  expr: s.fPi},
                {typeVar: s.iNeg.type,  expr: s.iNeg},

                {typeVar: s.m23.type,   expr: s.m23},
                {typeVar: s.m32.type,   expr: s.m32},
                {typeVar: s.m3.type,    expr: s.m3},

                {typeVar: s.v2.type,    expr: s.v2},
                {typeVar: s.v3.type,    expr: s.v3}
            ];

            testCases.forEach((testCase, index) => {
                const assignee = new WglShaderVariable('var', testCase.typeVar);
                const operation = new WglShaderAssignment(assignee, testCase.expr);
                const parseRegex = WglShaderTestingUtil.escapeRegexCharacters(testCase.expr.parse());
                expect(
                    operation.parse()).toMatch(new RegExp(testCase.typeVar.parse() + '\\s+var\\s*=\\s*' + parseRegex),
                    'Error at test case #' + index
                );
            });
        });

        it('should not execute with invalid types', () => {
            const testCases: {typeVar: ShaderExpressionType, expr: ShaderExpression}[] = [
                {typeVar: s.bTrue.type, expr: s.m23},
                {typeVar: s.bTrue.type, expr: s.v2},

                {typeVar: s.fPi.type,   expr: s.m23},
                {typeVar: s.fPi.type,   expr: s.v2},

                {typeVar: s.iNeg.type,  expr: s.m23},
                {typeVar: s.iNeg.type,  expr: s.v2},

                {typeVar: s.m23.type,   expr: s.bTrue},
                {typeVar: s.m23.type,   expr: s.fPi},
                {typeVar: s.m23.type,   expr: s.iNeg},
                {typeVar: s.m23.type,   expr: s.m32},
                {typeVar: s.m23.type,   expr: s.m3},
                {typeVar: s.m32.type,   expr: s.m23},
                {typeVar: s.m32.type,   expr: s.m3},
                {typeVar: s.m3.type,    expr: s.m23},
                {typeVar: s.m3.type,    expr: s.m32},
                {typeVar: s.m3.type,    expr: s.v2},

                {typeVar: s.v2.type,    expr: s.v3},
                {typeVar: s.v2.type,    expr: s.m23},
                {typeVar: s.v3.type,    expr: s.v2},
                {typeVar: s.v3.type,    expr: s.m23}
            ];

            testCases.forEach((testCase, index) => {
                const assignee = new WglShaderVariable('var', testCase.typeVar);
                expect(() => new WglShaderAssignment(assignee, testCase.expr)).toThrow();
            });
        });

    });

});
