import { WglShaderLValueNameParser } from './wgl-shader-l-value-name-parser';
import { ShaderVariable } from '../../../../../../../api/shaders/source/expression/lvalues/shader-variable';
import { WglShaderVariable } from '../wgl-shader-variable';
import { WglShaderIntegerType } from '../../types/wgl-shader-integer-type';
import { WglShaderTestingExpressionType } from '../../../../testing/wgl-shader-testing-expression-type';
import { WglShaderVoidType } from '../../types/wgl-shader-void-type';

describe(WglShaderLValueNameParser.name, () => {

    let variable: ShaderVariable;
    let parser: WglShaderLValueNameParser;

    beforeEach(() => {
        variable = new WglShaderVariable('variable', new WglShaderTestingExpressionType('testType'));
        parser = new WglShaderLValueNameParser(variable);
    });

    it('should be created', () => {
        expect(parser).toBeTruthy();
        expect(parser.variable).toBe(variable);
        expect(parser.type.parse()).toEqual(variable.type.parse());
    });

    describe('parse', () => {

        it('should work', () => {
            expect(parser.parse()).toMatch(/^\s*variable\s*$/);
        });

    });

});
