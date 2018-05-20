import { WglShaderInput } from './wgl-shader-input';
import { ShaderVaryingInputSide } from '../../../../../../api/shaders/source/expression/lvalues/shader-varying-input-side';

const TOKEN = 'varying';

export class WglShaderVaryingInputSide extends WglShaderInput implements ShaderVaryingInputSide {

    public parse(): string {
        return TOKEN + ' ' + super.parse();
    }

}
