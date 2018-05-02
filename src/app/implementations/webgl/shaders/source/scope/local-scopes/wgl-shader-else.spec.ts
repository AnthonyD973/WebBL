import { TestBed, inject } from '@angular/core/testing';
import { WglShaderElse } from './wgl-shader-else';
import { WglShaderIntegerType } from '../../expression/types/wgl-shader-integer-type';
import { ShaderExpressionType } from '../../../../../../api/shaders/source/expression/shader-expression-type';
import { ShaderExpression } from '../../../../../../api/shaders/source/expression/shader-expression';
import { WglShaderIntegerLiteral } from '../../expression/rvalues/wgl-shader-integer-literal';
import { WglShaderTestingUtil } from '../../../testing/wgl-shader-testing-util';
import { WglShaderTestingLocalScope } from '../../../testing/scopes/wgl-shader-testing-local-scope';
import { WglShaderIf } from './wgl-shader-if';
import { ShaderIf } from '../../../../../../api/shaders/source/scope/local-scopes/shader-if';
import { WglShaderBlock } from '../../statement/wgl-shader-block';

describe(WglShaderElse.name, () => {

    let statement: WglShaderElse;
    let parent: ShaderIf;

    beforeEach(() => {
        const grandparent = new WglShaderTestingLocalScope();
        parent = new WglShaderIf(new WglShaderIntegerLiteral(-1));
        grandparent.addChild(parent);
        statement = new WglShaderElse(parent);
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

    describe('addChild', () => {

        it('should throw an error', () => {
            expect(() => statement.addChild(new WglShaderBlock())).toThrow();
        });

    });

});
