import { WglShaderVaryingOutputSide } from './wgl-shader-varying-output-side';
import { ShaderExpressionType } from '../../../../../../api/shaders/source/expression/shader-expression-type';
import { WglShaderIntegerType } from '../types/wgl-shader-integer-type';
import { WglShaderTestingUtil as Util } from '../../../testing/wgl-shader-testing-util';

describe(WglShaderVaryingOutputSide.name, () => {

    let name: string;
    let type: ShaderExpressionType;
    let variable: WglShaderVaryingOutputSide;

    beforeEach(() => {
        name = 'foo';
        type = new WglShaderIntegerType();
        variable = new WglShaderVaryingOutputSide(name, type);
    });

    it('should be created', () => {
        expect(variable).toBeTruthy();
        expect(variable.name).toBe(name);
        expect(variable.type).toBe(type);
    });

    describe('parse', () => {

        it('should work', () => {
            const escapedType = Util.escapeRegexCharacters(type.parse());
            const escapedName = Util.escapeRegexCharacters(name);
            const parseRegex = new RegExp(`^\\s*varying\\s+${escapedType}\\s+${escapedName}\\s*;$`);
            expect(variable.parse()).toMatch(parseRegex);
        });

    });

    describe('isReadable', () => {

        it('should return false', () => {
            expect(variable.isReadable()).toBe(false);
        });

    });

});
