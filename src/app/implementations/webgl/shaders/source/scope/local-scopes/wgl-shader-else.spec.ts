import { TestBed, inject } from '@angular/core/testing';
import { WglShaderElse } from './wgl-shader-else';
import { WglShaderIntegerType } from '../../expression/types/wgl-shader-integer-type';
import { ShaderExpressionType } from '../../../../../../api/shaders/source/expression/shader-expression-type';
import { ShaderExpression } from '../../../../../../api/shaders/source/expression/shader-expression';
import { WglShaderIntegerLiteral } from '../../expression/rvalues/wgl-shader-integer-literal';
import { WglShaderTestingUtil } from '../../../testing/wgl-shader-testing-util';
import { WglShaderTestingLocalScope } from '../../../testing/scopes/wgl-shader-testing-local-scope';
import { ShaderLocalScope } from '../../../../../../api/shaders/source/scope/shader-local-scope';

describe(WglShaderElse.name, () => {

    let statement: WglShaderElse;
    let parent: ShaderLocalScope;

    beforeEach(() => {
        parent = new WglShaderTestingLocalScope();
        statement = new WglShaderElse();
        parent.makeParentOf(statement);
    });

    it('should be created', () => {
        expect(statement).toBeTruthy();
        expect(statement.scopeName).toBeTruthy();
    });

    describe('parse', () => {

        it('should parse the condition and a statement', () => {
            const regex = new RegExp('^\\s*else\\s*\\s+{\\n+\\s*}$');
            expect(statement.parse()).toMatch(regex);
        });

    });

});
