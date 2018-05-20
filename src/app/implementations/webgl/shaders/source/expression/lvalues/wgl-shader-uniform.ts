import { WglShaderInput } from './wgl-shader-input';
import { ShaderUniform } from '../../../../../../api/shaders/source/expression/lvalues/shader-uniform';

const TOKEN = 'uniform';

export class WglShaderUniform extends WglShaderInput implements ShaderUniform {

    public parse(): string {
        return TOKEN + ' ' + super.parse();
    }

}
