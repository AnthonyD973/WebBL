import { WglShaderLValueDeclarationParser } from './wgl-shader-l-value-declaration-parser';
import { ShaderVariable } from '../../../../../../../api/shaders/source/expression/lvalues/shader-variable';
import { WglShaderVariable } from '../wgl-shader-variable';
import { WglShaderIntegerType } from '../../types/wgl-shader-integer-type';
import { WglShaderTestingExpressionType } from '../../../../testing/wgl-shader-testing-expression-type';
import { WglShaderVoidType } from '../../types/wgl-shader-void-type';

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

        it('should work', () => {
            expect(parser.parse()).toMatch(/^\s*testType\s+variable\s*$/);
        });

    });

});
