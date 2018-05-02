import { TestBed, inject } from '@angular/core/testing';
import { WglShaderElseIf } from './wgl-shader-else-if';
import { WglShaderIntegerType } from '../../expression/types/wgl-shader-integer-type';
import { ShaderExpressionType } from '../../../../../../api/shaders/source/expression/shader-expression-type';
import { ShaderExpression } from '../../../../../../api/shaders/source/expression/shader-expression';
import { WglShaderIntegerLiteral } from '../../expression/rvalues/wgl-shader-integer-literal';
import { WglShaderTestingUtil } from '../../../testing/wgl-shader-testing-util';
import { ShaderIf } from '../../../../../../api/shaders/source/scope/local-scopes/shader-if';
import { WglShaderIf } from './wgl-shader-if';
import { WglShaderTestingLocalScope } from '../../../testing/scopes/wgl-shader-testing-local-scope';
import { WglShaderBlock } from '../../statement/wgl-shader-block';

describe(WglShaderElseIf.name, () => {

    let condition: ShaderExpression;
    let statement: WglShaderElseIf;
    let parent: ShaderIf;

    beforeEach(() => {
        const grandparent = new WglShaderTestingLocalScope();
        parent = new WglShaderIf(condition);
        grandparent.addChild(parent);
        condition = new WglShaderIntegerLiteral(-3);
        statement = new WglShaderElseIf(parent, condition);
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

    describe('addChild', () => {

        it('should throw an error', () => {
            expect(() => statement.addChild(new WglShaderBlock())).toThrow();
        });

    });

});
