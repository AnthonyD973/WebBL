import { WglShaderInput } from './wgl-shader-input';
import { ShaderAttribute } from '../../../../../../api/shaders/source/expression/lvalues/shader-attribute';

const TOKEN = 'attribute';

export class WglShaderAttribute extends WglShaderInput implements ShaderAttribute {

    public parse(): string {
        return TOKEN + ' ' + super.parse();
    }

}
