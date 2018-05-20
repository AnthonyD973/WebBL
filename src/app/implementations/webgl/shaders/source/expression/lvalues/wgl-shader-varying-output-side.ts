import { WglShaderOutput } from './wgl-shader-output';
import { ShaderVaryingOutputSide } from '../../../../../../api/shaders/source/expression/lvalues/shader-varying-output-side';

const TOKEN = 'varying';

export class WglShaderVaryingOutputSide extends WglShaderOutput implements ShaderVaryingOutputSide {

    public parse(): string {
        return TOKEN + ' ' + super.parse();
    }

}
