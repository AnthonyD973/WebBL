import { TestBed, inject } from '@angular/core/testing';
import { WglShaderBlock } from './wgl-shader-block';
import { ShaderExpression } from '../../../../../api/shaders/source/expression/shader-expression';
import { WglShaderMatrixLiteral } from '../expression/rvalues/wgl-shader-matrix-literal';
import { WglShaderAssignment } from '../expression/operators/binary/wgl-shader-assignment';
import { WglShaderVariable } from '../expression/lvalues/wgl-shader-variable';
import { WglShaderIntegerType } from '../expression/types/wgl-shader-integer-type';
import { WglShaderIntegerLiteral } from '../expression/rvalues/wgl-shader-integer-literal';
import { WglShaderTestingUtil } from '../../testing/wgl-shader-testing-util';

describe(WglShaderBlock.name, () => {

    let expressions: ShaderExpression[];
    let block: WglShaderBlock;

    beforeEach(() => {
        expressions = [
            new WglShaderIntegerLiteral(10),
            new WglShaderAssignment(
                new WglShaderVariable('foo', new WglShaderIntegerType()), new WglShaderIntegerLiteral(-3)
            ),
            new WglShaderMatrixLiteral(2, 2),
        ];
        block = new WglShaderBlock(expressions);
    });

    it('should be created', () => {
        expect(block).toBeTruthy();
    });

    describe('parse', () => {

        it('should parse a set of statements', () => {
            const regex0 = WglShaderTestingUtil.escapeRegexCharacters(expressions[0].parse()) + ';';
            const regex1 = WglShaderTestingUtil.escapeRegexCharacters(expressions[1].parse()) + ';';
            const regex2 = WglShaderTestingUtil.escapeRegexCharacters(expressions[2].parse()) + ';';
            const regex = new RegExp('^\\{\\n\\s*' + regex0 + '\\n\\s*' + regex1 + '\\n\\s*' + regex2 + '\\n\\}$');
            expect(block.parse()).toMatch(regex);
        });

    });

});
