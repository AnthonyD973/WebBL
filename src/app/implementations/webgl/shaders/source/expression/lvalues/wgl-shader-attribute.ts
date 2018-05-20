import { WglShaderInput } from './wgl-shader-input';
import { ShaderUniform } from '../../../../../../api/shaders/source/expression/lvalues/shader-uniform';

const TOKEN = 'attribute';

export class WglShaderAttribute extends WglShaderInput implements ShaderUniform {

    public parse(): string {
        return TOKEN + ' ' + super.parse();
    }

}
