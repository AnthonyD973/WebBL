import { TestBed, inject } from '@angular/core/testing';
import { WglShaderIf } from './wgl-shader-if';
import { WglShaderIntegerType } from '../../expression/types/wgl-shader-integer-type';
import { ShaderExpressionType } from '../../../../../../api/shaders/source/expression/shader-expression-type';
import { ShaderExpression } from '../../../../../../api/shaders/source/expression/shader-expression';
import { WglShaderIntegerLiteral } from '../../expression/rvalues/wgl-shader-integer-literal';
import { WglShaderTestingUtil } from '../../../testing/wgl-shader-testing-util';
import { WglShaderTestingLocalScope } from '../../../testing/scopes/wgl-shader-testing-local-scope';
import { ShaderLocalScope } from '../../../../../../api/shaders/source/scope/shader-local-scope';
import { WglShaderBlock } from '../../statement/wgl-shader-block';

describe(WglShaderIf.name, () => {

    let condition: ShaderExpression;
    let statement: WglShaderIf;
    let parent: ShaderLocalScope;

    beforeEach(() => {
        condition = new WglShaderIntegerLiteral(-3);
        statement = new WglShaderIf(condition);
        parent = new WglShaderTestingLocalScope();
        parent.addChild(statement);
    });

    it('should be created', () => {
        expect(statement).toBeTruthy();
        expect(statement.scopeName).toBeTruthy();
        expect(statement.condition).toBe(condition);
        expect(statement.elseIfs).toEqual([]);
    });

    describe('elseIf', () => {

        it('should create an else-if clause, save it and return it', () => {
            const elseIfStatement = statement.elseIf(condition);
            expect(elseIfStatement.parent).toBe(statement.parent);
            expect(elseIfStatement.condition).toBe(condition);
            expect(statement.elseIfs.length).toEqual(1);
            expect(statement.elseIfs[0]).toBe(elseIfStatement);
        });

        it('should be able to create multiple else-if clauses', () => {
            for (let i = 0; i < 10; ++i) {
                const elseIfStatement = statement.elseIf(condition);
                expect(elseIfStatement.parent).toBe(statement.parent);
                expect(elseIfStatement.condition).toBe(condition);
                expect(statement.elseIfs.length).toEqual(i + 1);
                expect(statement.elseIfs[i]).toBe(elseIfStatement);
            }
        });

        it('should not create an else-if clause when there already is an else clause', () => {
            statement.elseIf(condition);
            statement.else();
            expect(() => statement.elseIf(condition)).toThrow();
        });

    });

    describe('else', () => {

        it('should return an else statement with the same parent and the correct condition', () => {
            const elseStatement = statement.else();
            expect(elseStatement.parent).toBe(statement.parent);
        });

        it('should throw an error when executed more than once', () => {
            statement.else();
            for (let i = 0; i < 3; ++i) {
                expect(() => statement.else()).toThrow();
            }
        });

    });

    describe('parse', () => {

        it('should parse the condition and a statement', () => {
            const parsedCondition = WglShaderTestingUtil.escapeRegexCharacters(condition.parse());
            const regex = new RegExp('^\\s*if\\s*\\(' + parsedCondition + '\\)\\s+{\\n+'
                + '\\s*}$');
            expect(statement.parse()).toMatch(regex);
        });

    });

    describe('addChild', () => {

        it('should throw an error', () => {
            expect(() => statement.addChild(new WglShaderBlock())).toThrow();
        });

    });

});
