import { TestBed, inject } from '@angular/core/testing';
import { WglShaderElseIf } from './wgl-shader-else-if';
import { WglShaderIntegerType } from '../../expression/types/wgl-shader-integer-type';
import { ShaderExpressionType } from '../../../../../../api/shaders/source/expression/shader-expression-type';
import { ShaderExpression } from '../../../../../../api/shaders/source/expression/shader-expression';
import { WglShaderIntegerLiteral } from '../../expression/rvalues/wgl-shader-integer-literal';
import { WglShaderTestingUtil } from '../../../testing/wgl-shader-testing-util';
import { WglShaderTestingLocalScope } from '../../../testing/scopes/wgl-shader-testing-local-scope';
import { ShaderLocalScope } from '../../../../../../api/shaders/source/scope/shader-local-scope';

describe(WglShaderElseIf.name, () => {

    let condition: ShaderExpression;
    let statement: WglShaderElseIf;
    let parent: ShaderLocalScope;

    beforeEach(() => {
        condition = new WglShaderIntegerLiteral(-3);
        statement = new WglShaderElseIf(condition);
        parent = new WglShaderTestingLocalScope();
        parent.makeParentOf(statement);
    });

    it('should be created', () => {
        expect(statement).toBeTruthy();
        expect(statement.scopeName).toBeTruthy();
        expect(statement.condition).toBe(condition);
    });

    describe('parse', () => {

        it('should parse the condition and a statement', () => {
            const parsedCondition = WglShaderTestingUtil.escapeRegexCharacters(condition.parse());
            const regex = new RegExp('^\\s*else\\s+if\\s*\\(' + parsedCondition + '\\)\\s+{\\n+'
                + '\\s*}$');
            expect(statement.parse()).toMatch(regex);
        });

    });

});
