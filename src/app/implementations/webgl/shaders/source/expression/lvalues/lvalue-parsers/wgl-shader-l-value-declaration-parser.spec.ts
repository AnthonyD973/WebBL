import { WglShaderLValueDeclarationParser } from './wgl-shader-l-value-declaration-parser';
import { ShaderVariable } from '../../../../../../../api/shaders/source/expression/lvalues/shader-variable';
import { WglShaderVariable } from '../wgl-shader-variable';
import { WglShaderIntegerType } from '../../types/wgl-shader-integer-type';
import { WglShaderTestingExpressionType } from '../../../../testing/wgl-shader-testing-expression-type';
import { WglShaderVoidType } from '../../types/wgl-shader-void-type';
import { WglShaderUniform } from '../wgl-shader-uniform';
import { WglShaderAttribute } from '../wgl-shader-attribute';
import { WglShaderVaryingInputSide } from '../wgl-shader-varying-input-side';

describe(WglShaderLValueDeclarationParser.name, () => {

    let variable: ShaderVariable;
    let parser: WglShaderLValueDeclarationParser;

    beforeEach(() => {
        variable = new WglShaderVariable('variable', new WglShaderTestingExpressionType('testType'));
        parser = new WglShaderLValueDeclarationParser(variable);
    });

    it('should be created', () => {
        expect(parser).toBeTruthy();
        expect(parser.variable).toBe(variable);
        expect(parser.type.parse()).toEqual(new WglShaderVoidType().parse());
    });

    describe('parse', () => {

        it('should parse a normal variable\'s declaration', () => {
            expect(parser.parse()).toMatch(/^\s*testType\s+variable\s*$/);
        });

        it('should parse a uniform\'s declaration', () => {
            expect(
                new WglShaderLValueDeclarationParser(new WglShaderUniform('uni', new WglShaderIntegerType()))
                    .parse()
            ).toMatch(/^\s*uniform\s+int\s+uni\s*$/);
        });

        it('should parse an attribute\'s declaration', () => {
            expect(
                new WglShaderLValueDeclarationParser(new WglShaderAttribute('attr', new WglShaderIntegerType()))
                    .parse()
            ).toMatch(/^\s*attribute\s+int\s+attr\s*$/);
        });

        it('should parse a varying\'s input-side declaration', () => {
            expect(
                new WglShaderLValueDeclarationParser(new WglShaderVaryingInputSide('vary', new WglShaderIntegerType()))
                    .parse()
            ).toMatch(/^\s*varying\s+int\s+vary\s*$/);
        });

        it('should parse a varying\'s output-side declaration', () => {
            expect(
                new WglShaderLValueDeclarationParser(new WglShaderVaryingInputSide('vary', new WglShaderIntegerType()))
                    .parse()
            ).toMatch(/^\s*varying\s+int\s+vary\s*$/);
        });

    });

});
