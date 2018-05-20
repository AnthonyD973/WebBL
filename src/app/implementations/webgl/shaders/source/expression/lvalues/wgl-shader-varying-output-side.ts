import { WglShaderOutput } from './wgl-shader-output';
import { ShaderUniform } from '../../../../../../api/shaders/source/expression/lvalues/shader-uniform';

const TOKEN = 'varying';

export class WglShaderVaryingOutputSide extends WglShaderOutput implements ShaderUniform {

    public parse(): string {
        return TOKEN + ' ' + super.parse();
    }

}
