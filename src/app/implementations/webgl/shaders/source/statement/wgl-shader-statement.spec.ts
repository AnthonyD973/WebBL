import { TestBed, inject } from '@angular/core/testing';
import { WglShaderStatement } from './wgl-shader-statement';
import { ShaderExpression } from '../../../../../api/shaders/source/expression/shader-expression';
import { WglShaderMatrixLiteral } from '../expression/rvalues/wgl-shader-matrix-literal';
import { WglShaderAssignment } from '../expression/operators/binary/wgl-shader-assignment';
import { WglShaderVariable } from '../expression/lvalues/wgl-shader-variable';
import { WglShaderIntegerType } from '../expression/types/wgl-shader-integer-type';
import { WglShaderIntegerLiteral } from '../expression/rvalues/wgl-shader-integer-literal';
import { WglShaderTestingUtil } from '../../testing/wgl-shader-testing-util';

describe(WglShaderStatement.name, () => {

    let expression: ShaderExpression;
    let statement: WglShaderStatement;

    beforeEach(() => {
        expression =
            new WglShaderAssignment(
                new WglShaderVariable('foo', new WglShaderIntegerType()), new WglShaderIntegerLiteral(-3)
            );
        statement = new WglShaderStatement(expression);
    });

    it('should be created', () => {
        expect(statement).toBeTruthy();
    });

    describe('parse', () => {

        it('should parse a statement', () => {
            const expr = WglShaderTestingUtil.escapeRegexCharacters(expression.parse()) + ';';
            const regex = new RegExp('^\\s*' + expr + '$');
            expect(statement.parse()).toMatch(regex);
        });

    });

});
