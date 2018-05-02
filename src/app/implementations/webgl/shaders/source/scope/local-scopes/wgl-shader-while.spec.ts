import { TestBed, inject } from '@angular/core/testing';
import { WglShaderWhile } from './wgl-shader-while';
import { WglShaderIntegerType } from '../../expression/types/wgl-shader-integer-type';
import { ShaderExpressionType } from '../../../../../../api/shaders/source/expression/shader-expression-type';
import { ShaderExpression } from '../../../../../../api/shaders/source/expression/shader-expression';
import { WglShaderIntegerLiteral } from '../../expression/rvalues/wgl-shader-integer-literal';
import { WglShaderTestingUtil } from '../../../testing/wgl-shader-testing-util';
import { WglShaderTestingLocalScope } from '../../../testing/scopes/wgl-shader-testing-local-scope';
import { ShaderLocalScope } from '../../../../../../api/shaders/source/scope/shader-local-scope';
import { WglShaderBlock } from '../../statement/wgl-shader-block';

describe(WglShaderWhile.name, () => {

    let condition: ShaderExpression;
    let statement: WglShaderWhile;
    let parent: ShaderLocalScope;

    beforeEach(() => {
        condition = new WglShaderIntegerLiteral(-3);
        statement = new WglShaderWhile(condition);
        parent = new WglShaderTestingLocalScope();
        parent.addChild(statement);
    });

    it('should be created', () => {
        expect(statement).toBeTruthy();
        expect(statement.scopeName).toBeTruthy();
        expect(statement.condition).toBe(condition);
    });

    describe('parse', () => {

        it('should parse the condition and a statement', () => {
            const parsedCondition = WglShaderTestingUtil.escapeRegexCharacters(condition.parse());
            const regex = new RegExp('^\\s*while\\s*\\(' + parsedCondition + '\\)\\s+{\\n+'
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
