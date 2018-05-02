import { TestBed, inject } from '@angular/core/testing';
import { WglShaderFor } from './wgl-shader-for';
import { WglShaderIntegerType } from '../../expression/types/wgl-shader-integer-type';
import { ShaderExpressionType } from '../../../../../../api/shaders/source/expression/shader-expression-type';
import { ShaderExpression } from '../../../../../../api/shaders/source/expression/shader-expression';
import { WglShaderIntegerLiteral } from '../../expression/rvalues/wgl-shader-integer-literal';
import { WglShaderTestingUtil } from '../../../testing/wgl-shader-testing-util';
import { WglShaderTestingLocalScope } from '../../../testing/scopes/wgl-shader-testing-local-scope';
import { ShaderLocalScope } from '../../../../../../api/shaders/source/scope/shader-local-scope';

describe(WglShaderFor.name, () => {

    let init: ShaderExpression;
    let condition: ShaderExpression;
    let loop: ShaderExpression;
    let statement: WglShaderFor;
    let parent: ShaderLocalScope;

    beforeEach(() => {
        init = new WglShaderIntegerLiteral(-2);
        condition = new WglShaderIntegerLiteral(-3);
        loop = new WglShaderIntegerLiteral(-4);
        statement = new WglShaderFor(init, condition, loop);
        parent = new WglShaderTestingLocalScope();
        parent.addChild(statement);
    });

    it('should be created', () => {
        expect(statement).toBeTruthy();
        expect(statement.scopeName).toBeTruthy();
        expect(statement.init).toBe(init);
        expect(statement.condition).toBe(condition);
        expect(statement.loop).toBe(loop);
    });

    describe('parse', () => {

        it('should parse the condition and a statement', () => {
            const parsedInit = WglShaderTestingUtil.escapeRegexCharacters(init.parse());
            const parsedCondition = WglShaderTestingUtil.escapeRegexCharacters(condition.parse());
            const parsedLoop = WglShaderTestingUtil.escapeRegexCharacters(loop.parse());
            const regex = new RegExp('^\\s*for\\s*\\('
                + parsedInit + ';\\s+' + parsedCondition + ';\\s+' + parsedLoop + '\\)\\s+{\\n+'
                + '\\s*}$');
            expect(statement.parse()).toMatch(regex);
        });

    });

});
