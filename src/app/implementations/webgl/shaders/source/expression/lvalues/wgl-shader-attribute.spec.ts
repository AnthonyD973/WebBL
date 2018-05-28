import { WglShaderAttribute } from './wgl-shader-attribute';
import { ShaderExpressionType } from '../../../../../../api/shaders/source/expression/shader-expression-type';
import { WglShaderIntegerType } from '../types/wgl-shader-integer-type';
import { WglShaderTestingUtil as Util } from '../../../testing/wgl-shader-testing-util';

describe(WglShaderAttribute.name, () => {

    let name: string;
    let type: ShaderExpressionType;
    let variable: WglShaderAttribute;

    beforeEach(() => {
        name = 'foo';
        type = new WglShaderIntegerType();
        variable = new WglShaderAttribute(name, type);
    });

    it('should be created', () => {
        expect(variable).toBeTruthy();
        expect(variable.name).toBe(name);
        expect(variable.type).toBe(type);
    });

});
