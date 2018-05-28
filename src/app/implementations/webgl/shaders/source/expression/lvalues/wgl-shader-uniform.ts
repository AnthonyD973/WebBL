import { WglShaderInput } from './wgl-shader-input';
import { ShaderUniform } from '../../../../../../api/shaders/source/expression/lvalues/shader-uniform';
// tslint:disable-next-line:max-line-length
import { ShaderGenericLValueParser } from '../../../../../../api/shaders/source/expression/lvalues/lvalue-parsers/shader-generic-l-value-parser';

const TOKEN = 'uniform';

export class WglShaderUniform extends WglShaderInput implements ShaderUniform {

    public acceptVisitor(v: ShaderGenericLValueParser): string {
        return v.parseUniform(this);
    }

}
