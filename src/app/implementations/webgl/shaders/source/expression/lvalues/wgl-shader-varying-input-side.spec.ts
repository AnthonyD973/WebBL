import { WglShaderVaryingInputSide } from './wgl-shader-varying-input-side';
import { ShaderExpressionType } from '../../../../../../api/shaders/source/expression/shader-expression-type';
import { WglShaderIntegerType } from '../types/wgl-shader-integer-type';
import { WglShaderTestingUtil as Util } from '../../../testing/wgl-shader-testing-util';

describe(WglShaderVaryingInputSide.name, () => {

    let name: string;
    let type: ShaderExpressionType;
    let variable: WglShaderVaryingInputSide;

    beforeEach(() => {
        name = 'foo';
        type = new WglShaderIntegerType();
        variable = new WglShaderVaryingInputSide(name, type);
    });

    it('should be created', () => {
        expect(variable).toBeTruthy();
        expect(variable.name).toBe(name);
        expect(variable.type).toBe(type);
    });

});
