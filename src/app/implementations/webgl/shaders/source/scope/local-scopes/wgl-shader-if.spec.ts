import { TestBed, inject } from '@angular/core/testing';
import { WglShaderIf } from './wgl-shader-if';
import { WglShaderIntegerType } from '../../expression/types/wgl-shader-integer-type';
import { ShaderExpressionType } from '../../../../../../api/shaders/source/expression/shader-expression-type';
import { ShaderExpression } from '../../../../../../api/shaders/source/expression/shader-expression';
import { WglShaderIntegerLiteral } from '../../expression/rvalues/wgl-shader-integer-literal';
import { WglShaderTestingUtil } from '../../../testing/wgl-shader-testing-util';

describe(WglShaderIf.name, () => {

    let condition: ShaderExpression;
    let statement: WglShaderIf;

    beforeEach(() => {
        condition = new WglShaderIntegerLiteral(-3);
        statement = new WglShaderIf(condition);
    });

    it('should be created', () => {
        expect(statement).toBeTruthy();
        expect(statement.scopeName).toBeTruthy();
        expect(statement.condition).toBe(condition);
    });

    describe('elseIf', () => {

        it('should return an elseIf statement with the same parent and the correct condition', () => {
            const elseIfStatement = statement.elseIf(condition);
            expect(elseIfStatement.parent).toBe(statement.parent);
            expect(elseIfStatement.condition).toBe(condition);
        });

        it('should throw an error when executed more than once', () => {
            statement.elseIf(condition);
            for (let i = 0; i < 3; ++i) {
                expect(() => statement.elseIf(condition)).toThrow();
            }
        });

    });

    describe('else', () => {

        it('should return an else statement with the same parent and the correct condition', () => {
            const elseStatement = statement.else();
            expect(elseStatement.parent).toBe(statement.parent);
        });

        it('should not throw an error when executed more than once', () => {
            statement.else();
            for (let i = 0; i < 3; ++i) {
                expect(() => statement.else()).toThrow();
            }
        });

    });

    it('should not be able to have both an elseIf and an else statements', () => {
        expect(() => {
            statement.elseIf(condition);
            statement.else();
        }).toThrow();
    });

    describe('parse', () => {

        it('should parse the condition and a statement', () => {
            const parsedCondition = WglShaderTestingUtil.escapeRegexCharacters(condition.parse());
            const regex = new RegExp('^\\s*if\\s*\\(' + parsedCondition + '\\)\\s+{\\n+'
                + '\\s*}$');
            expect(statement.parse()).toMatch(regex);
        });

    });

});
