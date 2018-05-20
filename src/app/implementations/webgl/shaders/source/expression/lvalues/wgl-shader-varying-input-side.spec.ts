import { WglShaderUniform } from './wgl-shader-uniform';
import { ShaderExpressionType } from '../../../../../../api/shaders/source/expression/shader-expression-type';
import { WglShaderIntegerType } from '../types/wgl-shader-integer-type';
import { WglShaderTestingUtil as Util } from '../../../testing/wgl-shader-testing-util';

describe(WglShaderUniform.name, () => {

    let name: string;
    let type: ShaderExpressionType;
    let variable: WglShaderUniform;

    beforeEach(() => {
        name = 'foo';
        type = new WglShaderIntegerType();
        variable = new WglShaderUniform(name, type);
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
            const parseRegex = new RegExp(`^\\s*uniform\\s+${escapedType}\\s+${escapedName}\\s*;$`);
            expect(variable.parse()).toMatch(parseRegex);
        });

    });

});
